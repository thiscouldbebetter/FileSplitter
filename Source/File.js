
class File
{
	constructor(name, contentsAsBinaryString)
	{
		this.name = name;
		this.contentsAsBinaryString = contentsAsBinaryString;
	}

	download()
	{
		FileHelper.saveFile(this);
	}

	toDOMElement()
	{
		var returnValue = ControlBuilder.container
		(
			[
				ControlBuilder.inputText(null, this.name),
				ControlBuilder.button("Download", this.download, this)
			]
		);

		returnValue.file = this;

		return returnValue;
	}
}
