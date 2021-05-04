function myfunc()
{
    let text = document.getElementById("area").value;
    let word = document.getElementById("in").value;
    let count2 = 0;
    let indexes = new Array(0);
    let linenum = 1;
    let charIndex = 1;
    for (let count1 = 0; count1 < text.length; count1++)
    {
        if (text.charAt(count1) != '\n')
        {
            if (text.charAt(count1) == word.charAt(count2))
            {
                count2++;
                if (count2 == word.length)
                {
                    index = [linenum,(charIndex - word.length + 1)];
                    indexes.push(index);
                    count2 = 0;
                }
            }
            else
            {
                count2 = 0;
            }
        }
        else
        {
            linenum++;
            charIndex = 0;
        }
        charIndex++;
    }
    let out = "Entered phrase appears at\n";
    for (let count = 0; count < indexes.length - 1; count++)
    {
        out += "line " + indexes[count][0]  + ", character " + indexes[count][1] + ",\n"
    }
    out += "and line " + indexes[indexes.length - 1][0] + ", character " + indexes[indexes.length - 1][1] + ".\n"
    document.getElementById("output").innerHTML = out;
}
