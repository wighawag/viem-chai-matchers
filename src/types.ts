declare module Chai {
	export interface Assertion {
		revertedWith(error: string): PromisedAssertion;
		reverted(): PromisedAssertion;
	}
}
