import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const tronEnvSchema = z.object({
    TRON_PRIVATE_KEY: z.string().min(1, "TRON_PRIVATE_KEY is required"),
});

export type TronConfig = z.infer<typeof tronEnvSchema>

export async function validateTronConfig(
    runtime: IAgentRuntime
): Promise<TronConfig> {
    try {
        const config = {
            TRON_PRIVATE_KEY:
                runtime.getSetting("TRON_PRIVATE_KEY") ||
                process.env.TRON_PRIVATE_KEY,
        };

        return tronEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `TRON configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
