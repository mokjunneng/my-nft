# NFT DApp

## Installation

`npm install`

### Frameworks/Libraries used
1. `Next.js` - for application development
2. `HardHat` - development framework for smart contracts
3. `ethers.js` - for interacting with networks' EVM
4. `OpenZeppelin` - for extending the contract standards used for creating tokens

## Getting Started

### Environment Variables

Make sure these variables are specified in the `.env` file

```
// For connecting to the local database instance via Prisma client
DATABASE_URL="postgresql://nftuser:password@localhost:5436/nftdb?schema=public"

// Only when need to deploy to a test net
ALCHEMY_API_KEY="<your-alchemy-api-key>"
MNEMONIC="<your-account-mnemonic>"
// A contract has already been deployed to Sepolia with address "0x781a3b2b16e585bd6d07b8244b1f3d9de40e12ec"
NFT_CONTRACT_ADDRESS="<deploy-contract-address>"
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can connect your MetaMask wallet by clicking the `Connect MetaMask` button

---
## API

### Endpoints

1. `GET /api/list-nfts` - fetch all the tokens minted from persistence storage
2. `POST /api/mint-nft` - submit a transaction to the network to mint the token (untested)

### Local development

1. Run a docker container hosting PostgreSQL database locally `npm run start-docker-db` (to spin down container, simply run `npm run stop-docker-db`)
2. Run `npm run prisma:migrate-deploy` to apply all pending migrations, and create the database if it does not exist.
> **_NOTE:_** This will generate the Prisma Client types too (`npx prisma generate`)

If the database schema changes, create a new migration by running `npm run prisma:migrate-dev`

---
## Smart Contract (NFT)

Followed the [ERC721](https://docs.openzeppelin.com/contracts/4.x/erc721) standard in developing the smart contract which is just a basic contract with an exposed `mintCard` function.

> **DISCLAIMER:** The token assets are inspired by Hearthstone's Battlegrounds, any usage of card names and details are purely for hobby purpose without any commercial interest. All rights goes to [Blizzard Entertainment](https://www.blizzard.com/en-us/).

Run script `./scripts/contract-event-listener.ts` to poll for event logs from the deployed contract and update the persistence. It listens to the `"Minted"` event whenever `mintCard` is called.

### Local development

1. Compile the contract(s) - `npm run compile-contracts`
2. Run a blockchain locally using `hardhat` - `npm run deploy-contracts-local`
3. Deploy contract(s) onto block chain - `npm run deploy-contracts-local`
4. Either interact with the blockchain via the Next.js API or console (`npx hardhat console --network localhost`)

### Deployment to TestNet (Sepolia)

1. Compile the contract(s) - `npm run compile-contracts`
2. Deploy contract(s) onto block chain - `npm deploy-contracts-testnet`

## Future cross-region, scalable infrastructure design choices

                       ┌───────────────────────────────────┐
                       │          User / Client            │
                       └───────────────────────────────────┘
                                       │
                                       ▼
                       ┌───────────────────────────────────┐
                       │        Amazon CloudFront          │
                       └───────────────────────────────────┘
                                       │
                           ┌───────────▼───────────--┐
                           │       Amazon API        │
                           │   Gateway (Multi-Region)│
                           └───────────┬───────────--┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            │                          │                           │
        ┌─────▼─────┐             ┌─────▼─────┐             ┌─────▼─────┐
        │ Region A  │             │ Region B  │             │ Region C  │
        └─────┬─────┘             └─────┬─────┘             └─────┬─────┘
              │                         │                        │
              │                        │                        │
     ┌────────▼────────┐      ┌────────▼────────┐      ┌────────▼────────┐
     │ Amazon EC2 /   │      │ Amazon EC2 /   │        │ Amazon EC2 /   │
     │  ECS Cluster   │      │  ECS Cluster   │        │  ECS Cluster   │
     └────────┬───────┘      └────────┬───────┘        └────────┬───────┘
              │                       │                        │
              │                       │                        │
              └──────▲────────────────┘                       │
                     │                                       │
                     │                                       │
          ┌──────────▼─────────┐                 ┌──────────▼─────────┐
          │ Amazon RDS /     │                  │ Amazon RDS /     │
          │   Aurora (Multi- │                  │   Aurora (Multi- │
          │     Region)      │                  │     Region)      │
          └──────────────────┘                  └──────────────────┘


1. Multi-Region: Choose the AWS regions strategically to provide geographic redundancy and reduce latency for users. Consider regions that are close to target audience and have high availability.

2. Content Delivery Network (CDN): Utilize Amazon CloudFront, AWS's content delivery network, to cache and serve static content (images, videos, CSS, JS files) closer to end-users, reducing latency and improving performance.

3. Database Replication: Implement cross-region replication for databases to ensure data redundancy and disaster recovery.Amazon RDS (Relational Database Service) and Amazon Aurora has built-in multi-region replication capabilities.

4. Global Load Balancing: Amazon Route 53 has "Geolocation" routing policy to route users to the nearest available region based on their geographic location, reducing latency for end-users.

5. Asynchronous Message queues: Use  asynchronous communication patterns like message queues (Amazon SQS) or event-driven architectures (AWS Lambda with Amazon SNS) for inter-region communication.

6. Data Caching: Employ caching strategies to reduce database calls and improve response times. Services like Amazon ElastiCache can provide in-memory caching for frequently accessed data.

7. Observability: Use AWS CloudWatch to monitor the performance and health of infrastructure across regions.

## TODOs
1. Complete Next.js application (frontend integration with API)
2. Hosting dApp on Vercel
