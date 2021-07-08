import React, { useState, useEffect} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function EloProgressionGraph({matches}){
    useEffect(()=>{
        const formattedMatches = []
        for (let i = 0; i < data.length; i++){
            const match ={
                Date: matches[i].date.split('T')[0],
                Rating: matches[i].player_rating,
                Opponent: matches[i].opponent_name
            }
            formattedMatches.push(match)
        }
        setData(formattedMatches)
        getLowestHighest()
    },[])

    const [data, setData] = useState(matches)
    const [low, setLow] = useState(1200)
    const [high, setHigh] = useState(1400)

    const getLowestHighest = ()=>{
        let highest = 1200
        for (let i = 0; i < matches.length; i++){
            if (matches[i].player_rating >= highest) highest = matches[i].player_rating
        }
        setHigh(highest + 10)

        let lowest = 1200
        for (let i = 0; i < matches.length; i++){
            if (matches[i].player_rating <= lowest) lowest = matches[i].player_rating
        }
        setLow(lowest - 10)

    }

    return (
        <ResponsiveContainer>
            <LineChart
                data={data}
                margin={{ top: 5, left: 15, right: 5, bottom: 15 }}>
                <XAxis
                    dataKey="Date"
                    label={{value:'Date', position: 'bottom'}}
                />
                <YAxis
                    dataKey="Rating"
                    label={{value:'Rating', angle: -90, position: 'left'}}
                    domain={[low, high]}/>
                <Line type="monotone" dataKey="Rating" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}