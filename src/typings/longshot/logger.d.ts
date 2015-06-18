declare module "ls-logger" {
	function info(message: string): void;
	function warn(message: string): void;
	function error(message: string): void;
	function debug(message: string): void;
}
