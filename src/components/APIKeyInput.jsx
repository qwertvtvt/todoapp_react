function APIKeyInput({apiKey, setAPIKey}) {
    return (
        <>
            <label className='form-label'>API Key</label>
            <input type="text" value={apiKey} onChange={(e) => setAPIKey(e.target.value)} className='form-control' />
        </>
    )
}

export default APIKeyInput;