
class ControlBuilder
{
	static button(text, methodToRunOnClick, contextForMethod)
	{
		var returnValue = document.createElement("button");
		returnValue.innerHTML = text;
		returnValue.onclick = function(event)
		{
			methodToRunOnClick.call(contextForMethod, event);
		}
		return returnValue;
	}

	static container(childControls, hasBorder)
	{
		var returnValue = document.createElement("div");
		for (var i = 0; i < childControls.length; i++)
		{
			var childControl = childControls[i];
			returnValue.appendChild(childControl);
		}
		if (hasBorder == true)
		{
			returnValue.style = "border:1px solid";
		}
		return returnValue;
	}

	static fileUploader(methodToRunOnChange, contextForMethod)
	{
		var returnValue = document.createElement("input");
		returnValue.type = "file";
		returnValue.onchange = function(changeEvent)
		{
			methodToRunOnChange.call(contextForMethod, changeEvent);
		}
		return returnValue;
	}

	static inputNumber(id, value, methodToRunOnChange, contextForMethod)
	{
		var returnValue = document.createElement("input");
		returnValue.id = id;
		returnValue.value = value;
		returnValue.type = "number";
		returnValue.onchange = function(event)
		{
			methodToRunOnChange.call(contextForMethod, event);
		}
		return returnValue;
	}

	static inputText(id, value, isReadOnly)
	{
		var returnValue = document.createElement("input");
		returnValue.id = id;
		returnValue.value = value;
		returnValue.readonly = isReadOnly;
		return returnValue;
	}

	static label(text)
	{
		var returnValue = document.createElement("label");
		returnValue.innerHTML = text;
		return returnValue;
	}

	static toDOMElementsMany(controllables)
	{
		var returnValues = [];

		for (var i = 0; i < controllables.length; i++)
		{
			var controllable = controllables[i];
			var control = controllable.toDOMElement();
			returnValues.push(control);
		}

		return returnValues;
	}
}