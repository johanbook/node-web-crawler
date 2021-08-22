import { enableFetchMocks } from "jest-fetch-mock";

// Avoid program logs to outputed to stdout
jest.mock("./logger");

enableFetchMocks();
