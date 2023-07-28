# Use an official Golang base image
FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the Go application source code to the container
COPY . .

# Build the Go application
RUN go build -o app

# Run the Go application inside the container
CMD ["./app"]