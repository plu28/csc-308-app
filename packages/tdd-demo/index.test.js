/* Reflection on TDD:
 * In my opinion, TDD can work very well when the developer has a clear understanding
 * of what they are building. The tasks in this assignment were simple to grok,
 * so TDD made sense and was fairly enjoyable. 
 *
 * In an ideal TDD case, developers have a *perfect* understanding of all implicit
 * requirements before writing any tests.
 * This also means that customers need to also provide a *perfect* explanation
 * of what they want your software to do, even when most of the time, they probably 
 * don't have a *perfect* understanding of what they want to begin with.
 *
 * So I am just skeptical of TDD's application in real software development.
 * Maybe if the software isn't that complex and communication between the 
 * engineer and the customer is strong, than TDD could be an efficient strategy.
 *
 * But, I am open to being proven wrong and will keep trying TDD.
 * */
const index = require ('./index');

test('open a stock portfolio', () => {
	const target = new Map();
	const value = index.openPortfolio();

	expect(value).toStrictEqual(target);
});

test('empty stock portfolio should return true', () => {
	let portfolio = index.openPortfolio();
	const target = true;
	const value = index.isEmpty(portfolio);
	expect(value).toBe(target);
});

test('checking isEmpty of a non-map object should throw a TypeError', () => {
	expect(() => index.isEmpty("string")).toThrow(TypeError);
});

test('buyShare: attempting to pass in a non Map object should throw a TypeError', () => {
	expect(() => index.buyShare("string", 'nvda', 5)).toThrow(TypeError);
});

test('purchasing a share in an empty portfolio', () => {
	let portfolio = index.openPortfolio();
	index.buyShare(portfolio, 'nvda', 5);

	const target = 5;
	const value = portfolio.get('nvda');
	expect(value).toStrictEqual(target);
});

test('purchasing multiple shares in a portfolio', () => {
	let portfolio = index.openPortfolio();
	index.buyShare(portfolio, 'nvda', 5);
	index.buyShare(portfolio, 'nvda', 5);

	const target = 10;
	const value = portfolio.get('nvda');
	expect(value).toStrictEqual(target);
});

test('sellShare: attemping to pass in a non Map object should throw a TypeError', () => {
	expect(() => index.sellShare("string", 'nvda', 5)).toThrow(TypeError);
});

test('selling a share you do not have should throw Error', () => {
	let portfolio = index.openPortfolio();
	expect(() => index.sellShare(portfolio, 'nvda', 5)).toThrow(Error);
});

test('attempting to sell more shares than possessed should throw error', () => {
	let portfolio = index.openPortfolio();
	index.buyShare(portfolio, 'nvda', 5);
	expect(() => index.sellShare(portfolio, 'nvda', 6)).toThrow(Error);
});

test('selling all portfolio shares should remove ticker from portfolio', () => {
	let portfolio = index.openPortfolio();
	index.buyShare(portfolio, 'nvda', 5);
	index.sellShare(portfolio, 'nvda', 5);

	const value = portfolio.get('nvda');
	expect(value).toBeUndefined();
});


test('getting the size of a non-portfolio should throw TypeError', () => {
	expect(() => index.portfolioSize("string")).toThrow(TypeError);
});

test('size of empty portfolio should be 0', () => {
	let portfolio = index.openPortfolio();
	const target = 0;
	const value = index.portfolioSize(portfolio);

	expect(value).toStrictEqual(target);
});

test('size of 3 ticker portfolio should be 3', () => {
	let portfolio = index.openPortfolio();
	index.buyShare(portfolio, 'nvda', 3);
	index.buyShare(portfolio, 'intc', 3);
	index.buyShare(portfolio, 'aapl', 3);

	const target = 3;
	const value = index.portfolioSize(portfolio);
	expect(value).toStrictEqual(target);
});

test('size of 3 ticker portfolio, but one of the tickers has no shares should be 2', () => {
	let portfolio = index.openPortfolio();
	index.buyShare(portfolio, 'nvda', 3);
	index.buyShare(portfolio, 'intc', 3);
	index.buyShare(portfolio, 'aapl', 3);
	index.sellShare(portfolio, 'aapl', 3);

	const target = 2;
	const value = index.portfolioSize(portfolio);
	expect(value).toStrictEqual(target);
});

test('attempting to get the holding of an invalid portfolio should throw TypeError', () => {
	expect(() => index.portfolioHolding("string", 'nvda')).toThrow(TypeError);
});

test('getting the portfolio holding of a ticker you dont have any shares of should return 0', () => {
	let portfolio = index.openPortfolio();

	const target = 0;
	const value = index.portfolioHolding(portfolio, 'nvda');
	expect(value).toStrictEqual(target);
});

test('getting the portfolio holding of a ticker with 3 shares returns 3', () => {
	let portfolio = index.openPortfolio();
	index.buyShare(portfolio, 'nvda', 3);

	const target = 3;
	const value = index.portfolioHolding(portfolio, 'nvda');
	expect(value).toStrictEqual(target);
});


