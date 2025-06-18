FROM golang:1.21

WORKDIR /app

# Copy and install Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy Go source and build
COPY . .
RUN go build -o server

EXPOSE 3001

CMD ["./server"]
