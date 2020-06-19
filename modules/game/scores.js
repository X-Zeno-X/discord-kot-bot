const file = './data/game/score.json';
const fs = require('fs');

/**
 * Loads a kot score from the database.
 *
 * @param id  a user id
 * @returns {[]|score}  a user score
 */
function load(id)
{
    let score = JSON.parse(fs.readFileSync(file, 'utf8'));

    // If an argument is provided, retrieve one score.
    if(id !== undefined)
        return score.find(score => score.name === id);
    else
    {
        // Otherwise, retrieve all scores in order.
        score.sort(function(a, b)
        {
            return b.kot_score - a.kot_score;
        });

        let rank = 1;
        for(let i = 0; i < score.length; i++)
        {
            if(i !== 0)
            {
                // If the score is lower, rank increases.
                if(score[i].kot_score < score[i - 1].kot_score)
                {
                    rank++;
                }
            }

            score[i].rank = rank;
        }

        return score;
    }
}

/**
 * Updates a gay score in the database.
 *
 * @param id  a user id
 */
function updateGay(id)
{
    let score = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Find or create a new data value for the update.
    let value = score.find(score => score.name === id);
    if(value === undefined)
    {
        value = createEntry(id);
        score.push(value);
    }

    // Increase the score.
    value.gay_score++;

    // Write the data.
    fs.writeFileSync(file, JSON.stringify(score));
}

/**
 * Updates a kot score in the database.
 *
 * @param id  a user id
 * @param mult  a kot multiplier
 */
function updateKot(id, mult)
{
    let score = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Find or create a new data value for the update.
    let value = score.find(score => score.name === id);
    if(value === undefined)
    {
        value = createEntry(id);
        value.kot_multiplier = mult;
        score.push(value);
    }

    value.kot_score++;
    // Increase the score.
    if(value.kot_multiplier < mult)
    {
        value.kot_multiplier = mult;
    }

    // Write the data.
    fs.writeFileSync(file, JSON.stringify(score));
}

function createEntry(id)
{
    return {name:id, gay_score:0, kot_score:0, kot_multiplier:0};
}


module.exports =
    {
        load: load,
        updateGay: updateGay,
        updateKot: updateKot
    };