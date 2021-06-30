# DeLi (Decentralized Live)

### TODOs

- (GK) Bug I should not see the same contracts as you see
- (GK) App starts always with wrong url
- (NK) save after updating an invoice 
- (GK) add a search form to contract list - ()
- (GK) add a search form to invoice list - ()
- (GK) when registering or deploying smart contract go back to contract list
- (GK) App should ask to connect with the correct blockchain (matic, ethereum, etc.) 
- (NK) test / fix production lines in InvoicePage (remove wrong ones)
- (NK) fix invoice date issue


### Avion DB
- (GK) Authentification with Moralis must be replaced with a standard Metamask authentification
- (GK) Bug "I should not see the same contracts as you see"
- (NK) write avion db version
- (GK) add a search form to contract list - ()
- (GK) add a search form to invoice list - ()
- (NK) save after updating an invoice 

### 3rd party provider todos
- (GK) deploy on matic
- (GK/NK) use 1inch to swap our (DeLi) token on site https://1inch.io/
- (GK) deploy to second blockchain (moonbeam)

### missing functions
- invoice pdf
- show, mark and filter paid and unpaid invoices 
- send invoice by email


### design
- NK - Logo, Icons
- (NK/JC) write about DeLive on Landing Page (Write Invoice, Get Paid in crypto, Staking, Dividends, Parent and Child tokens)
- find designer who can quickly fix landing page and app.
- add numbers to landing page. total deployed staking contracts, currently locked value

### smart contracts
#### Staking Token
- (GK) rename FreelanceToken to DeLive DeLi
- (NK) distribute invoice payments to stakers (x%)
- (GK) When somebody pays an invoice - received invoice should be distributed automatically according to stakes of stake holder- check https://vittominacori.github.io/erc1363-payable-token/#abstract if this is needed here. 
- (NK) 1% to parent token after payment
- (GK) add USDT, xDAI and other stable tokens to smart contract (should be able to send)


#### Invoice Token
- (NK) create Invoice SmartContract with InvoiceNo, ipfs cid

#### Documentation
- vision statement
- write Documentation

#### other projects like this
- https://invoicing.request.network/login
- https://cryptoinvoice.io


### Done
- (2021-06-30) (GK) write invoice in € or $ or BTC or ETC display current value in another currency via chainlink price feed 
- (2021-06-25) (GK) add USDT, xDAI and other stable tokens to smart contract (should be able to send)
- (2021-06-22) (GK) SmartContract which I clicked should have a different row color 
- (2021-06-18) (GK) Add a drop down with 2 networks - (rinkeby and matic-mumbay)
- (2021-06-17) (GK) click & display invoice
- (2021-06-17) (GK) Bug if clicking on List Invoices when in InvoicePage it should jump back to the correct contract
- (2021-06-17) (GK) click & display invoice
- (2021-06-17) (NK/GK) create updatable smart contract
- (2021-06-15) (GK) enable delete invoice in Invoice Table again (typescript problem)
- (2021-06-15) (GK) display totalStakes, ourStake in contract list
- (2021-06-14) (NK) save inoice with contract address
- (2021-06-14) (NK) save invoice
- (2021-06-14) (NK) fix broken InvoicePage 