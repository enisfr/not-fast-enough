# Not Fast Enough
This project is developed by [enisfr](https://github.com/enisfr)   
It is a nodejs API and used for testing download speed for your internet connection.  
All tests are stored in the mongodb and past tests can also be retrieved.

Speed testing is established via [fast-speedtest-api](https://github.com/branchard/fast-speedtest-api)

# Usage

**FAST_API_KEY, SERVER_PORT, MONGODB_CONNECTION_STRING** must be given as environment variables.

# Example HTTP Method
    http://localhost:3000?limit=2&unit=Mbps

## Query Parameters
**unit**: Refers to measurement unit
- Bps
- Kbps
- Mbps
- Gbps

**limit**: Refers how many past measurements will be retrieved. Must be a **number**.

# Stack

- Nodejs
- Express
- MongoDB
- Mongoose
