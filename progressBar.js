var metricNewValue = function(name, old, units)
{
    for (i = 0; i<userMetrics.length; i++) 
    {
        if (userMetrics[i].name == name) 
        {
            return old + units * userMetrics[i].unit;
        }
    }

    for (i = 0; i<companyMetrics.length; i++) 
    {
        if (userMetrics[i].name == name) 
        {
            return old + units * userMetrics[i].unit;
        }
    }
}

var progressbarNewValue = function(name, old, units)
{
for (i = 0; i<userMetrics.length; i++) 
    {
        if (userMetrics[i].name == name) 
        {
            return old + units * userMetrics[i].proc;
        }
    }

    for (i = 0; i<companyMetrics.length; i++) 
    {
        if (userMetrics[i].name == name) 
        {
            return old + units * userMetrics[i].proc;
        }
    }
}
