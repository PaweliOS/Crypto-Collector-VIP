const checkAllBtn = document.querySelector('.buttons__btn-checkAll')
const btcPrice = document.querySelector('.crypto__coins--btc-price')
const ethPrice = document.querySelector('.crypto__coins--eth-price')
const qogePrice = document.querySelector('.crypto__coins--qoge-price')
const plsrPrice = document.querySelector('.crypto__coins--plsr-price')

// const URL = 'https://api.coingecko.com/api/v3/exchange_rates'

// === poniżej tylko dla wybranej crypto sama cena ====
const BTC = 'bitcoin'
const USD = 'usd'
const ETH = 'ethereum'
const EXBITRON_qogeusdt = 'qogeusdt'
const EXBITRON_plsrusdt = 'plsrusdt'
const URL_BTC_USD = 'https://api.coingecko.com/api/v3/simple/price?ids='+BTC+'&vs_currencies='+USD
const URL_ETH_USD = 'https://api.coingecko.com/api/v3/simple/price?ids=' + ETH + '&vs_currencies=' + USD

const URL_EXBITRON_BTC = 'https://www.exbitron.com/api/v2/peatio/public/markets/'+EXBITRON_qogeusdt+'/order-book'
const URL_EXBITRON_PLSR = 'https://www.exbitron.com/api/v2/peatio/public/markets/'+EXBITRON_plsrusdt+'/order-book'

// === poniżej dla jednego coina (ethereum) pełna informacja =====
// const URL = 'https://api.coingecko.com/api/v3/coins/ethereum'



// =============== obsługa =================
// const getPrice = () => {
//     fetch(URL)
//     .then(res => res.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(err))
// }

//  ============ klasycznie =================
// const getPrice = () => {
//     axios.get(URL).then(res => console.log(res.data.rates.usd.value))
//     axios.get(URL).then(res => (btcPrice.textContent = res.data.rates.usd.value + ' USD'))
// }

//========== funkcja asynchroniczna ==============
// dla  const URL = 'https://api.coingecko.com/api/v3/exchange_rates'
// async function getPrice() {
//     const resp = await axios.get(URL)
//     btcPrice.textContent = resp.data.rates.usd.value + ' USD'
// }


async function getPrice() {
    const respBtc = await axios.get(URL_BTC_USD)
    const respEth = await axios.get(URL_ETH_USD)
    const respExbitronQoge = await axios.get(URL_EXBITRON_BTC)
    const respExbitronPlsr = await axios.get(URL_EXBITRON_PLSR)
    
    // console.log(respExbitronQoge.data.bids[0].price)
    // console.log(respExbitronQoge.data.bids[0].price)
    
    qogePrice.textContent = respExbitronQoge.data.bids[0].price + ' USD'
    plsrPrice.textContent = respExbitronPlsr.data.bids[0].price + ' USD'
    btcPrice.textContent = respBtc.data.bitcoin.usd + ' USD'
    ethPrice.textContent = respEth.data.ethereum.usd + ' USD'
    
}

// for (n = 0; n = 3600; n++){
//     sleep(1000).console.log('ciach')
    
// }

checkAllBtn.addEventListener('click', getPrice)