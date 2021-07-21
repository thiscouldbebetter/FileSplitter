
class FileHelper
{
	static loadFile(fileToLoad, callback, contextForCallback)
	{
		var fileReader = new FileReader();
		fileReader.systemFile = fileToLoad;
		fileReader.callback = callback;
		fileReader.contextForCallback = contextForCallback;
		fileReader.onload = FileHelper.loadFile_FileLoaded;
		fileReader.readAsBinaryString(fileToLoad);
	}

	static loadFile_FileLoaded(fileLoadedEvent)
	{
		var fileReader = fileLoadedEvent.target;
		var contentsOfFileLoadedAsBinaryString = fileReader.result;
		var fileName = fileReader.systemFile.name;
		var fileLoaded = new File(fileName, contentsOfFileLoadedAsBinaryString);

		var callback = fileReader.callback;
		var contextForCallback = fileReader.contextForCallback;
		callback.call(contextForCallback, fileLoaded);
	}

	static saveFile(fileToSave)
	{
		var fileAsByteString = fileToSave.contentsAsBinaryString;
		var fileAsArrayBuffer = new ArrayBuffer(fileAsByteString.length);
		var fileAsArrayUnsigned = new Uint8Array(fileAsArrayBuffer);
		for (var i = 0; i < fileAsByteString.length; i++) 
		{
			fileAsArrayUnsigned[i] = fileAsByteString.charCodeAt(i);
		}

		var fileAsBlob = new Blob([fileAsArrayBuffer], {type:'unknown/unknown'});

		var link = document.createElement("a");
		link.href = window.URL.createObjectURL(fileAsBlob);
		link.download = fileToSave.name;
		link.click();
	}
}
