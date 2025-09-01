class ResponseHandler:
    def __init__(self):
        self.response = {"ERR_MSG": "", "DATA": []}

    def add_data(self, data: dict):
        self.response["DATA"].append(data)

    def set_error_message(self, error_message):
        self.response["ERR_MSG"] = error_message

    def get_response(self):
        return self.response
