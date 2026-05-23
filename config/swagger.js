const swaggerJSDoc = require("swagger-jsdoc");

const servers = [
    {
        url: "http://localhost:3000",
        description: "Local server",
    },
];

if (process.env.NODE_ENV === "production") {
    servers.push({
        url: "https://your-render-url.onrender.com",
        description: "Production server",
    });
}

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Ragna Bank API",
        version: "1.0.0",
        description:
            "Secure banking API for authentication, transfers, accounts, and transactions",
        contact: {
            name: "Ragna Bank Dev Team",
        },
    },
    servers,
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        components: {   // 👈 HERE
            schemas: {
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "Invalid credentials" },
                    },
                },
            },

            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);


