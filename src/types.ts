declare module Chai {
	export interface Assertion {
		revertedWith(error: string): void;
	}
}
