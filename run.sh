#!/bin/bash

npm run dev &
NEXT_PID=$!

sleep 5

open -a "Google Chrome" http://localhost:3000

while pgrep -x "Google Chrome" > /dev/null; do
  sleep 2
done

kill $NEXT_PID
