export enum ApiVersion {
	V1,
}

const BASE_URL = {
	[ApiVersion.V1]: "/v1",
};

const ADMIN_ROUTE = "admin"
const AUTH_ROUTE = "auth"
const PROTECTED_ROUTE = "protected"
const PUBLIC_ROUTE = "public"
const PAYMENT_ROUTE = "payment"

export const forAdmin = (endpoint: string) => ADMIN_ROUTE + `/${endpoint}`;
export const forAuth = (endpoint: string) => AUTH_ROUTE + `/${endpoint}`;
export const forProtected = (endpoint: string) => PROTECTED_ROUTE + `/${endpoint}`;
export const forPublic = (endpoint: string) => PUBLIC_ROUTE + `/${endpoint}`;
export const forPayment = (endpoint: string) => PAYMENT_ROUTE + `/${endpoint}`;

export const withParam = (endpoint: string, param: string = "param") => endpoint + `/:${param}`

export const getRoute = (endpoint: string, version: keyof typeof BASE_URL = ApiVersion.V1) => BASE_URL[version] + `/${endpoint}`

export const CHECK_USERNAME_AVAILABILITY = "available";
export const SEND_OTP = "send-otp";
export const VERIFY_OTP_AND_SIGNUP = "signup";
export const RESET_PASS = "reset-pass";
export const VERIFY_OTP_AND_LOGIN = "login";
export const GET_ACCESS_TOKEN = "token";
export const GET_ACTIVE_SESSION_LIST = "sessions";
export const LOGOUT = "logout";
export const LOGOUT_ALL = "logout/all";

const action = Object.freeze({
	list: "list",
})

export const ORDER = {
	self: "order",
	get verify() { return `${this.self}/verify` },
	get event() { return `${this.self}/event` }
}

export const TICKET = {
	self: "ticket",
	get list() { return `${this.self}/${action.list}` },
	get timeline() { return `${this.self}/timeline` },
	get info() { return `${this.self}/info` }
}

export const DELETE_SCHEDULE = {
	self: "account-delete-schedule"
}

export const USER = {
	self: "user",
	get profile() { return `${this.self}/profile` },
	get preferences() { return `${this.self}/preferences` },
	get email() { return `${this.self}/email` },
	get phone() { return `${this.self}/phone` },
	get password() { return `${this.self}/password` },
	get account() { return `${this.self}/account` },
}
export const GOAL = {
	self: "goal",
	get list() { return `${this.self}/${action.list}` }
};
export const CLASS = {
	self: "class",
	get list() { return `${this.self}/${action.list}` },
	get list_with_goals() { return `${this.list}/with-goals` },
};
export const STUDY_MATERIAL_TYPE = {
	self: "study-material-type",
	get list() { return `${this.self}/${action.list}` },
};
export const STUDY_MATERIAL_SUBJECT = {
	self: "study-material-subject",
	get list() { return `${this.self}/${action.list}` },
};
export const PDF = {
	self: "pdf",
	get list() { return `${this.self}/${action.list}` },
	get url() { return `${this.self}/url` },
};
export const TEST_SERIES = {
	self: "test-series",
	get list() { return `${this.self}/${action.list}` },
};
export const TEST = {
	self: "test",
	get list() { return `${this.self}/${action.list}` },
};

export const ANNOUNCEMENT = {
	self: "announcement",
	get list() { return `${this.self}/${action.list}` },
};

export const QUESTION = {
	self: "question",
	get list() { return `${this.self}/${action.list}` },
};

export const OPTION = {
	self: "option",
	get list() { return `${this.self}/${action.list}` },
};

export const CORRECT_OPTION = {
	self: "correct-option",
	get list() { return `${this.self}/${action.list}` },
};

export const BOOKMARK_QUESTION = {
	self: "bookmark-question",
	get list() { return `${this.self}/${action.list}` },
};

export const EXTRA_INFO = {
	self: "extra-info",
	get list() { return `${this.self}/${action.list}` },
};