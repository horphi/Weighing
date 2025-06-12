FROM node:20-bullseye AS builder

# Add specific version pins for better reproducibility
WORKDIR /app

# Copy package files
COPY ./package.json ./package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY ./ ./

# Set production environment
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the Next.js app with standalone output
RUN npm run build

# Stage 2: Run the application
FROM node:20-bullseye AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Create the log directory and set permissions
RUN mkdir -p /app/logs && chown -R nextjs:nodejs /app/logs

# Copy public folder
COPY --from=builder /app/public ./public

# Copy standalone server files if they exist
COPY --from=builder /app/.next/standalone ./

# Copy static files
COPY --from=builder /app/.next/static ./.next/static

# Add health check for container monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Set proper permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port
EXPOSE 3000

# Set hostname
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"]