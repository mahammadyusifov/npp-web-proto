import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { parseRequestBody } from './utils-bayesian/parser';
import { validateFormData } from './utils-bayesian/validate';
import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const ecsClient = new ECSClient({});
const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const TABLE_NAME = process.env.JOBS_TABLE_NAME;
const CLUSTER_NAME = process.env.CLUSTER_NAME;
const TASK_DEFINITION = process.env.TASK_DEFINITION;
const SUBNET_ID = process.env.SUBNET_ID;
const CONTAINER_NAME = process.env.CONTAINER_NAME;

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("Received request to start simulation job.");

  if (!TABLE_NAME || !CLUSTER_NAME || !TASK_DEFINITION || !SUBNET_ID || !CONTAINER_NAME) {
    console.error("Missing required environment variables.");
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Internal server error: Service is not configured correctly." }),
    };
  }

  const { success, data: nestedData, error: parsingError } = parseRequestBody(event);

  if (!success || !nestedData) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: parsingError }),
    };
  }

  // --- FLATTEN THE DATA STRUCTURE ---
  // Extract settings and combine with the rest of the form data.
  const { settings, ...tabData } = nestedData;
  const flatFormData: Record<string, any> = { ...settings };

  // The tab data is nested one level deeper, so we need to flatten it.
  for (const key in tabData) {
      Object.assign(flatFormData, tabData[key]);
  }

  const { isValid, errors } = validateFormData(flatFormData);

  if (!isValid) {
    console.error("Validation failed:", errors);
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Invalid form data submitted.", errors }),
    };
  }

  console.log("Validation successful. Proceeding to start Fargate task...");

  try {
    const jobId = randomUUID();
    console.log(`Starting job with ID: ${jobId}`);

    const dbItem = {
      jobId,
      jobStatus: "PENDING",
      formData: flatFormData,
      createdAt: new Date().toISOString(),
    };
    await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: dbItem }));

    const formDataEnvironmentVariables = Object.entries(flatFormData).map(([key, value]) => ({
      name: key,
      value: String(value),
    }));

    const command = new RunTaskCommand({
      cluster: CLUSTER_NAME,
      taskDefinition: TASK_DEFINITION,
      launchType: "FARGATE",
      networkConfiguration: {
        awsvpcConfiguration: { subnets: [SUBNET_ID], assignPublicIp: "ENABLED" },
      },
      overrides: {
        containerOverrides: [{
          name: CONTAINER_NAME,
          environment: [{ name: "JOB_ID", value: jobId }, ...formDataEnvironmentVariables],
        }],
      },
    });

    await ecsClient.send(command);
    console.log(`Fargate task started successfully for job ${jobId}.`);

    return {
      statusCode: 202,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Job accepted for processing.", jobId }),
    };
  } catch (error) {
    console.error("Error activating Fargate task:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Internal server error: Could not start the simulation job." }),
    };
  }
};