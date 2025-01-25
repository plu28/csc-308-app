const openPortfolio = (() => {
	return new Map();
})

const isEmpty = ((portfolio) => {
	if (portfolio instanceof Map) return portfolio.size === 0;
	else throw new TypeError('attempted to pass in a non Map object');
})

const buyShare = ((portfolio, ticker, amount) => {
	if (!(portfolio instanceof Map)) throw new TypeError('attempted to pass in a non Map object');
	let curr_amount = portfolio.get(ticker);
	if (curr_amount) {
		portfolio.set(ticker, curr_amount + amount);
	} else {
		portfolio.set(ticker, amount);
	}
	return true
});

const sellShare = ((portfolio, ticker, amount) => {
	if (!(portfolio instanceof Map)) throw new TypeError('attempted to pass in a non Map object');
	let curr_amount = portfolio.get(ticker);
	if (curr_amount === undefined) throw Error('attempted to sell a share for a ticker not in your portfolio');
	else if (curr_amount - amount < 0) throw Error(`attempted to sell ${amount} shares of ${ticker} when only ${curr_amount} shares are in portfolio`);

	portfolio.set(ticker, curr_amount - amount);

	if (portfolio.get(ticker) === 0) {
		portfolio.delete(ticker);
	}

	return curr_amount - amount;
});

const portfolioSize = ((portfolio) => {
	if (!(portfolio instanceof Map)) throw new TypeError('attempted to pass in a non Map object');
	let size = 0;
	for (const val of portfolio.values()) if (val !== 0) size++;
	return size;
});

const portfolioHolding = ((portfolio, ticker) => {
	if (!(portfolio instanceof Map)) throw new TypeError('attempted to pass in a non Map object');

	const shares = portfolio.get(ticker);
	if (shares === undefined) return 0;
	return shares;
});


exports.openPortfolio = openPortfolio;
exports.isEmpty = isEmpty;
exports.buyShare = buyShare;
exports.sellShare = sellShare;
exports.portfolioSize = portfolioSize;
exports.portfolioHolding = portfolioHolding;
