import { PrismaClient } from "@prisma/client";
import { Config } from "./config";
import { NFTController } from "./controllers/nft";
import { NFTService } from "./services/nft";
import { NFTPersistence } from "./services/persistence";

export function getDependencies() {
  const config = Config.loadFromEnvironmentVariables();
  const dbClient = new PrismaClient({
    log: ["warn", "error"],
  });

  // Initialize services
  const nftService = new NFTService(config.nftContractAddress);
  const persistence = new NFTPersistence(dbClient);

  // Initialize controllers
  const nftController = new NFTController(nftService, persistence);

  return {
    nftController,
  };
}
