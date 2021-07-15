function myfunc()
{
    let withoutLetters = document.getElementById("check1").checked;
    let caseSpecific = document.getElementById("check2").checked;
    let text = document.getElementById("area").value;
    let word = document.getElementById("in").value;
    let indexes = new Array(0);
    let charIndex = 0;
    let textArr = new Array(0);
    let line = '';
    /*Put each line of text into an array*/
    for (let count = 0; count < text.length; count++)
    {
        if (text.charAt(count) !== '\n')
        {
            line = line + text.charAt(count);
        }
        else
        {
            textArr.push(line);
            line = '';
        }
    }
    textArr.push(line);
    /*************************************/

    /*Search textArr for the word and store each instance in indexes*/
    if (caseSpecific)
    {
        for (let count1 = 0; count1 < textArr.length; count1++)
        {
            for (let count2 = 0; count2 < textArr[count1].length; count2++)
            {
                if (textArr[count1].charAt(count2) === word.charAt(charIndex))
                {
                    charIndex++;
                    if (charIndex === word.length)
                    {
                        indexes.push([count1, count2 - word.length + 1]);
                        charIndex = 0;
                    }
                }
                else
                {
                    charIndex = 0;
                }
            }
        }
    }
    else
    {
        for (let count1 = 0; count1 < textArr.length; count1++)
        {
            for (let count2 = 0; count2 < textArr[count1].length; count2++)
            {
                let code = textArr[count1].charCodeAt(count2);
                if (textArr[count1].charAt(count2) === word.charAt(charIndex))
                {
                    charIndex++;
                    if (charIndex === word.length)
                    {
                        indexes.push([count1, count2 - word.length + 1]);
                        charIndex = 0;
                    }
                }
                else if ((code > 64 && code < 91) || (code > 96 && code < 123))
                {
                    let thisChar;
                    if (code < 96)
                    {
                        thisChar = String.fromCharCode(code + 32);
                    }
                    else
                    {
                        thisChar = String.fromCharCode(code - 32);
                    }
                    if (thisChar === word.charAt(charIndex))
                    {
                        charIndex++;
                        if (charIndex === word.length)
                        {
                            indexes.push([count1, count2 - word.length + 1]);
                            charIndex = 0;
                        }
                    }
                }
                else
                {
                    charIndex = 0;
                }
            }
        }
    }
    /****************************************************************/

    /*Remove any instances where the word is surrounded by letters*/
    if (withoutLetters)
    {
        let badIndexes = new Array(0);
        for (let count = 0; count < indexes.length; count++)
        {
            let lineIndex = indexes[count][0];
            charIndex = indexes[count][1];
            let isValid = true;
            if (charIndex > 0)
            {
                let c = textArr[lineIndex].charCodeAt(charIndex - 1);
                if ((c > 64 && c < 91) || (c > 96 && c < 123))
                {
                    isValid = false;
                }
            }
            charIndex = charIndex + word.length;
            if (isValid && charIndex < textArr[lineIndex].length)
            {
                let c = textArr[lineIndex].charCodeAt(charIndex);
                if ((c > 64 && c < 91) || (c > 96 && c < 123))
                {
                    isValid = false;
                }
            }

            if (!isValid)
            {
                badIndexes.push(count);
            }
        }
        for (let x = 0; x < badIndexes.length; x++)
        {
            indexes.splice(badIndexes[x], 1);
        }
    }
    /*************************************************************/

    /*Adjust all line and char number values*/
    for (let x = 0; x < indexes.length; x++)
    {
        indexes[x].splice(0,1,indexes[x][0] + 1)
        indexes[x].splice(1,1,indexes[x][1] + 1)
    }
    /****************************************/

    try
    {
        let out = "Entered phrase appears at\n";
        for (let count = 0; count < indexes.length - 1; count++)
        {
            out += "line " + indexes[count][0]  + ", character " + indexes[count][1] + ",\n"
        }
        out += "and line " + indexes[indexes.length - 1][0] + ", character " + indexes[indexes.length - 1][1] + ".\n"
        document.getElementById("output").innerHTML = out;
    }
    catch (e)
    {
        let out = "An error occurred. Please try again";
        if (e instanceof TypeError)
        {
            out = "Entered phrase not found\n";
        }
        document.getElementById("output").innerHTML = out;
    }
}
