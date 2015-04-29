function SyncAsynced() {
	var taskCount = 0;
	
	/**
	 * start a function which supports a callback and wait till all functions are done.
	 * set SyncAsyncedTasks.done to a function which should be executed after all functions ended.
	 * @param task                      the function to execute
	 * @param callbackArgumentPosition  the position index of the callback argument in the function specified in parameter task (or null to append it as last argument)
	 * @param all additional parameters get passed to the function
	 */
	this.start = function (task, callbackArgumentPosition) {
		var self = this;
		++taskCount;
		var args = Array.prototype.slice.call(arguments, 2);
		
		callback = function () {
			--taskCount || self.done();
		};		
		if (callbackArgumentPosition) {
			/* insert callback at specified argument position */
			args.splice(callbackArgumentPosition, 0, callback);
		} else {
			/* add callback as last argument */
			args[args.length] = callback;
		}
		task.apply(this,args);		
	};
	
	/**
	 * is called after all functions are done
	 */
	this.done = done = function () { };
	
}