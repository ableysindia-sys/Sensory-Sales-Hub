# Use Node 20 as specified in your stack
FROM node:20-slim

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .

# Trick the preinstall bouncer 
ENV npm_config_user_agent="pnpm/9.0.0"

# Install dependencies
RUN pnpm install

# Build both the Vite client and the Express server
RUN pnpm --filter @workspace/ableys-rehab run build

# Cloud Run expects traffic on 8080
EXPOSE 8080
ENV PORT=8080

# Start the compiled Express server
CMD ["node", "artifacts/ableys-rehab/dist/index.cjs"]
