import {Abi, TransactionExecutionError, TransactionReceipt, decodeEventLog} from 'viem';
import './types';

export function viemChaiMatchers(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) {
	var Assertion = chai.Assertion;
	Assertion.addMethod('revertedWith', function (input) {
		new Assertion(this._obj).to.eventually.be.rejected.and.be.an
			.instanceOf(TransactionExecutionError)
			.and.have.property(
				'details',
				// TODO  Does viem has a better way to extract the error string ?
				`VM Exception while processing transaction: reverted with reason string '${input}'`
			);
	});
	Assertion.addMethod('reverted', function () {
		new Assertion(this._obj).to.eventually.be.rejected.and.be.an.instanceOf(TransactionExecutionError);
	});

	Assertion.addMethod('includeEvent', function (abi: Abi, eventName: string) {
		const receipt: TransactionReceipt = this._obj;
		for (const log of receipt.logs) {
			try {
				const event = decodeEventLog({
					abi: abi,
					topics: log.topics,
					eventName: eventName,
					data: log.data,
				});
				if (event.eventName === eventName) {
					return new Assertion(event);
				}
			} catch {}
		}
		throw new Error(`could not find any matching event for ${eventName}`);
	});
}
