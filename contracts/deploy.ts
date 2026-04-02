// deploy.ts
// Natively deploys the MidnightZap.compact contract to a Midnight Testnet Node
import { deployContract, NodeLocalConfig } from '@midnight-ntwrk/midnight-js';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('--- Phase 1: Midnight Contract Deployment ---');
  
  const NODE_URL = process.env.MIDNIGHT_NODE_URL || 'https://testnet.midnight.network';
  const networkConfig = new NodeLocalConfig(NODE_URL);
  
  // Load compiled artifacts
  const compiledWasmPath = path.join(__dirname, 'build', 'MidnightZap.wasm');
  const compiledMjsPath = path.join(__dirname, 'build', 'MidnightZap.mjs');
  
  if (!fs.existsSync(compiledWasmPath)) {
      console.error('❌ Compilation artifacts not found! Run the Compact compiler first:');
      console.error('`compactc src/MidnightZap.compact --out-dir build`');
      process.exit(1);
  }

  const wasmBuffer = fs.readFileSync(compiledWasmPath);
  const contractLogic = await import(compiledMjsPath);

  console.log(`Connecting to Midnight Testnet at ${NODE_URL}...`);
  
  try {
      // Assuming a wallet provider is initialized or private key is supplied via env
      const deploymentResult = await deployContract(
          networkConfig,
          {
              contract: contractLogic.contract,
              wasm: wasmBuffer,
              // Setup constructor arguments (if any)
              args: []
          }
      );

      console.log('✅ Deployment Successful!');
      console.log(`📝 Contract Ledger Address: ${deploymentResult.contractAddress}`);
      console.log('Export this address to your frontend components:');
      console.log(`export MIDNIGHTZAP_APP_ID=${deploymentResult.contractAddress}`);
  } catch (error) {
      console.error('❌ Failed to deploy to the Midnight Network:', error);
      process.exit(1);
  }
}

main();
