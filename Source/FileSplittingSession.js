
class FileSplittingSession
{
	constructor()
	{
		this.fileUnified = null;
		this.filesSplit = [];
		this.filesSplitByCountNotSize = false;
		this.bytesPerFileSplitOrFileCount = 1000;
	}

	bytesPerFileSplit_Changed(event)
	{
		var inputBytesPerFileSplit = event.target;
		var bytesPerFileSplitAsString =
			inputBytesPerFileSplit.value;
		this.bytesPerFileSplitOrFileCount =
			parseInt(bytesPerFileSplitAsString);
	}

	join()
	{
		if (this.filesSplit.length == 0)
		{
			alert("No files to join!");
			return;
		}

		var fileUnifiedAsBinaryString = "";

		var fileUnifiedName = this.filesSplit[0].name + "-Joined";

		for (var i = 0; i < this.filesSplit.length; i++)
		{
			var fileSplit = this.filesSplit[i];
			var fileSplitAsBinaryString = fileSplit.contentsAsBinaryString;
			fileUnifiedAsBinaryString += fileSplitAsBinaryString;
		} 

		this.fileUnified = new File
		(
			fileUnifiedName, fileUnifiedAsBinaryString
		);

		this.domElementUpdate();
	}

	fileSplitAdd(event)
	{
		var inputFileSplitToAdd = event.target;
		var systemFileToAdd = inputFileSplitToAdd.files[0];
		if (systemFileToAdd == null)
		{
			alert("No file specified!");
		}
		else
		{
			FileHelper.loadFile
			(
				systemFileToAdd, 
				this.fileSplitAdd_FileLoaded, 
				this
			)
		}
	}

	fileSplitAdd_FileLoaded(fileLoaded)
	{
		this.filesSplit.push(fileLoaded);
		this.domElementUpdate();
	}

	fileUnifiedUpload(event)
	{
		var inputFileUnified = event.target;
		var systemFileUnified = inputFileUnified.files[0];
		if (systemFileUnified == null)
		{
			alert("No file specified!");
		}
		else
		{
			FileHelper.loadFile
			(
				systemFileUnified, 
				this.fileUnifiedUpload_FileLoaded, 
				this
			)
		}
	}

	fileUnifiedUpload_FileLoaded(fileLoaded)
	{
		this.fileUnified = fileLoaded;
		this.domElementUpdate();
	}

	split()
	{
		var fileToSplit = this.fileUnified;

		if (fileToSplit == null)
		{
			alert("No file to split!");
			return;
		}

		this.filesSplit.length = 0;

		var fileToSplitAsBinaryString = fileToSplit.contentsAsBinaryString;
		var numberOfBytesInFileToSplit = fileToSplitAsBinaryString.length;

		var bytesPerFileSplit;
		var numberOfFilesSplit;

		if (this.filesSplitByCountNotSize)
		{
			numberOfFilesSplit =
				this.bytesPerFileSplitOrFileCount;

			bytesPerFileSplit = Math.ceil
			(
				numberOfBytesInFileToSplit
				/ numberOfFilesSplit
			);
		}
		else
		{
			bytesPerFileSplit =
				this.bytesPerFileSplitOrFileCount;

			numberOfFilesSplit = Math.ceil
			(
				numberOfBytesInFileToSplit
				/ bytesPerFileSplit
			);
		}
		
		var fileNameRoot = fileToSplit.name + "-";	

		for (var i = 0; i < numberOfFilesSplit; i++)
		{
			var byteIndexStart =
				i * bytesPerFileSplit;

			var byteIndexEnd =
				byteIndexStart + bytesPerFileSplit - 1;

			if (byteIndexEnd >= numberOfBytesInFileToSplit)
			{
				byteIndexEnd = numberOfBytesInFileToSplit - 1;
			}

			var fileSplitAsBinaryString = fileToSplitAsBinaryString.substring // not "substr"!
			(
				byteIndexStart,
				byteIndexEnd + 1
			);

			var fileName = 
				fileNameRoot + (i + 1) + "of" + numberOfFilesSplit;
			var fileNameAndContents = new File
			(
				fileName, fileSplitAsBinaryString
			);
			this.filesSplit.push(fileNameAndContents);
		}

		this.domElementUpdate();
	}

	// dom

	domElementUpdate()
	{
		var session = this;

		var containerFileUnified = ControlBuilder.container
		(
			[
				ControlBuilder.label("File Unified:"),
				ControlBuilder.fileUploader(this.fileUnifiedUpload, this),
				(this.fileUnified == null ? ControlBuilder.label("[none]") : this.fileUnified.toDOMElement())
			],
			true // hasBorder
		);

		var optionValueASpecifiedNumberOfParts =
			"a specified number of parts:";

		var containerSplitAndJoin = ControlBuilder.container
		(
			[

				ControlBuilder.label("Split into"),
				ControlBuilder.select
				(
					"selectSplitMethod",
					[
						"parts with a maximum size in bytes:",
						optionValueASpecifiedNumberOfParts
					],
					0, // optionToSelectIndex
					// methodToRunOnChange
					(event) =>
					{
						var valueSelected = event.target.value;
						var valueToSet =
							(valueSelected == optionValueASpecifiedNumberOfParts);
						session.filesSplitByCountNotSize = valueToSet;
					}
				),
				ControlBuilder.inputNumber
				(
					"inputBytesPerFileSplit", 
					this.bytesPerFileSplitOrFileCount, 
					this.bytesPerFileSplit_Changed, 
					this
				),
				ControlBuilder.button("Split", this.split, this),
				ControlBuilder.button("Join", this.join, this),
			],
			true // hasBorder
		);

		var containerFilesSplit = ControlBuilder.container
		(	
			[
				ControlBuilder.label("Files Split:"),
				ControlBuilder.fileUploader(this.fileSplitAdd, this),
				ControlBuilder.container
				(
					ControlBuilder.toDOMElementsMany(this.filesSplit)
				),
			],

			true // hasBorder
		);

		var containerSession = ControlBuilder.container
		([
			containerFileUnified,
			containerSplitAndJoin,
			containerFilesSplit,
		]);
		
		var divMain = document.getElementById("divMain");
		divMain.innerHTML = "";
		divMain.appendChild(containerSession);
	}
}
