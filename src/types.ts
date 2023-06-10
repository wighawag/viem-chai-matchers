declare module Chai {
	export interface Assertion {
		revertedWith(error: string): PromisedAssertion;
		reverted(): PromisedAssertion;
		includeEvent(abi: any, eventName: string): Assertion; // TODO Abi ?
	}
}
