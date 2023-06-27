import React, { useEffect, useState } from 'react'

const saveValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const getValue = (key, defaultValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue
    if (defaultValue instanceof Function) return defaultValue()
    return defaultValue
}

export default function useLocalStorage(storageKey, defaultValue) {
    const [value, setValue] = useState(() => getValue(storageKey, defaultValue))

    useEffect(() => {
        saveValue(storageKey, value)
    }, [value])

    return ([value, setValue])
}
