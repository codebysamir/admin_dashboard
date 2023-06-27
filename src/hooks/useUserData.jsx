import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { transformMonth } from '../utils/dateTransformer'

export default function useUserData() {
  const [userStats, setUserStats] = useState([])
  const { getUserStatsRequest, stats, users } = useContext(UserContext)

  console.log(stats)

  useEffect(() => {
    const controller = new AbortController()

    getUserStatsRequest(controller)

    return () => controller.abort()
  }, [users])

  useEffect(() => {
    if (stats.length) setUserStats(stats.map(month => {
      return {
        name: transformMonth(month._id),
        "Active User": month.total
      }
    }))
  }, [stats])
  
  return [userStats, setUserStats]
}
