import {TransactionExecutionError} from 'viem';
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
}
