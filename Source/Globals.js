
class Globals
{
	// instance

	static Instance = new Globals();

	// methods

	initialize()
	{
		this.fileSplittingSession = new FileSplittingSession();
		this.fileSplittingSession.domElementUpdate();
	}
}