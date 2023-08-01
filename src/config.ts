import { getMandatoryEnvironmentVariable } from "./helpers/environment";

export class Config {
  constructor(readonly nftContractAddress: string) {}

  static loadFromEnvironmentVariables(): Config {
    return new Config(getMandatoryEnvironmentVariable("NFT_CONTRACT_ADDRESS"));
  }
}
