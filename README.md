# DeLi (Decentralized Live)

### TODOs
- (GK) click & display invoice
- (GK) SmartContract which I clicked should have a different row color 
- (GK) Bug I should not see the same contracts as you see
- (GK) App starts always with wrong url
- (GK) App should ask to connect with the correct blockchain (matic, ethereum, etc.) 
- (GK) display totalStakes, ourStake in contract list - (done)

- (GK) enable delete invoice in Invoice Table again (typescript problem) - (done)
- (NK) save after updating an invoice 
- (GK) add a search form to contract list - ()
- (GK) add a search form to invoice list - ()
- (GK) when registering or deploying smart contract go back to contract list
- (NK) test / fix production lines in InvoicePage (remove wrong ones)
- (NK) fix invoice date issue


### 3rd party provider todos
- (GK) deploy on matic
- (GK/NK) use 1inch to swap our (DeLi) token on site https://1inch.io/
- (GK) deploy to second blockchain (moonbeam)

### missing functions
- (GK)  write invoice in € or $ or BTC or ETC display current value in another currency via chainlink price feed 
- send invoice by email
- show, mark and filter paid and unpaid invoices 

### design
- NK - Logo, Icons
- (NK/JC) write about DeLive on Landing Page (Write Invoice, Get Paid in crypto, Staking, Dividends, Parent and Child tokens)
- find designer who can quickly fix landing page and app.
- add numbers to landing page. total deployed staking contracts, currently locked value

### smart contracts
#### Staking Token
- (GK) create updatable smart contract
- (GK) rename FreelanceToken to DeLive DeLi
- (NK) distribute invoice payments to stakers (x%)
- (NK) 1% to parent token 
- (GK) add USDT, xDAI and other stable tokens to smart contract (should be able to send)


#### Invoice Token
- (NK) create Invoice SmartContract with InvoiceNo, ipfs cid

#### Documentation
- vision statement
- write Documentation

### Done
- (2021-06-14) (NK) save inoice with contract address
- (2021-06-14) (NK) save invoice
- (2021-06-14) (NK) fix broken InvoicePage 