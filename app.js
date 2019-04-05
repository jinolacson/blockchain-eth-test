var Tx     = require('ethereumjs-tx')
const Web3 = require('web3')

const ropstenAccnt = "";
const web3 = new Web3(ropstenAccnt)

/**
 * Add your metamask accounts:
 * account1 and account2
 */
const account1 = 'address1' 
const account2 = 'address2' 

const privateKey1 = Buffer.from('YOUR_PRIVATE_KEY_1', 'hex')
const privateKey2 = Buffer.from('YOUR_PRIVATE_KEY_2', 'hex')

// web3.eth.getBlockNumber().then((latest) => {
//   for (let i = 0; i < 10; i++) {
//     web3.eth.getBlock(latest - i).then(console.log)
//   }
// })

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})