const checkAllBtn = document.querySelector('.buttons__btn-checkAll')
const btcPrice = document.querySelector('.crypto__coins--btc-price')
const ethPrice = document.querySelector('.crypto__coins--eth-price')
const qogePrice = document.querySelector('.crypto__coins--qoge-price')
const plsrPrice = document.querySelector('.crypto__coins--plsr-price')

// ============ rplant ============//
const netHashrate = document.querySelector('.crypto__net-hashrate')

const poolWorkers = document.querySelector('.crypto__pool-workers')
const poolHashrate = document.querySelector('.crypto__pool-hashrate')

const minerWorkers = document.querySelector('.crypto__miner-workers')
const minerHashrate = document.querySelector('.crypto__miner-hashrate')
const minerShares = document.querySelector('.crypto__miner-shares')
const minerCoinsDay = document.querySelector('.crypto__miner-coins-day')

const warning = document.querySelector('.warning')
const warningButton = document.querySelector('.warning__button')



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

// ========= rplant ========= //
const URL_NET_HASHRATE = 'https://pool.rplant.xyz/api/stats'
const URL_POOL_WORKERS = 'https://pool.rplant.xyz/api/stats'
const URL_POOL_HASHRATE = 'https://pool.rplant.xyz/api/stats'
const URL_MINER = 'https://pool.rplant.xyz/api/walletEx/qogecoin/bq1q3x2jxmvz7w0h74s7zys4jsnt7u80066fp3mqh4'

let poolHashrateValue
let minerHashrateValue
const blocksday = 669

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
    setTimeout(activateCheckAllBtn, 10000)
    checkAllBtn.setAttribute('class', 'btn btn-primary buttons__btns buttons__btn-checkAll fs-3 disabled')

    // const respBtc = await axios.get(URL_BTC_USD)
    await axios.get(URL_BTC_USD)
        .then((resp) => {
            btcPrice.textContent = resp.data.bitcoin.usd + ' USD'
        })
        .catch(() => { warning.classList.remove('d-none') })
    //(warning.textContent = 'Nie udało połączyć się z serwerem!')
    //console.log('błąd')
    const respEth = await axios.get(URL_ETH_USD)
    const respExbitronQoge = await axios.get(URL_EXBITRON_BTC)
    const respExbitronPlsr = await axios.get(URL_EXBITRON_PLSR)
    const respRplantNetHashrate = await axios.get(URL_NET_HASHRATE)
    const respRplantPoolWorkers = await axios.get(URL_POOL_WORKERS)
    const respRplantPoolHashrate = await axios.get(URL_POOL_HASHRATE)

    const respRplantPoolMiner = await axios.get(URL_MINER)
    
    qogePrice.textContent = respExbitronQoge.data.bids[0].price + ' USD'
    plsrPrice.textContent = respExbitronPlsr.data.bids[0].price + ' USD'
    // btcPrice.textContent = respBtc.data.bitcoin.usd + ' USD'
    ethPrice.textContent = respEth.data.ethereum.usd + ' USD'
    netHashrate.textContent = respRplantNetHashrate.data.pools.qogecoin.poolStats.networkSols + ' kH/s'
    poolWorkers.textContent = respRplantPoolWorkers.data.pools.qogecoin.poolStats.workerCount 
    poolHashrateValue = respRplantPoolHashrate.data.pools.qogecoin.hashrate
    poolHashrate.textContent = poolHashrateValue
    minerWorkers.textContent = respRplantPoolMiner.data.miners.length
    minerHashrateValue = respRplantPoolMiner.data.hashrate
    minerHashrate.textContent = minerHashrateValue
    minerShares.textContent = respRplantPoolMiner.data.shares
    minerCoinsDay.textContent = roundX_Y(calcCoinsDay(poolHashrateValue, minerHashrateValue), 1)
    // console.log(respRplantPoolMiner.data.miners.length)
    

}

function activateCheckAllBtn() {
    checkAllBtn.classList.remove('disabled')
}

const calcCoinsDay = (poolHashrateValue, minerHashrateValue) => {
    let output = minerHashrateValue * blocksday / poolHashrateValue * 50
    return output
    
}

// roundX_Y zaokrąglij liczbę X do Y miejsc po przecinku
const roundX_Y = (x,y) => {
    let output = (Math.round(x * Math.pow(10, y)))/Math.pow(10, y)
    return output
}

const hideWarning = () => {
    warning.classList.add('d-none')
}

checkAllBtn.addEventListener('click', getPrice)
warningButton.addEventListener('click', hideWarning)