const Error = ({ error }: any) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-40">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Error</h2>

        <div>
          {error.status && (
            <p className="text-red-500 mb-2">Status: {error.status}</p>
          )}
          {error?.statusText && (
            <p className="text-red-500 mb-2">Status Text: {error.statusText}</p>
          )}
          {error?.message ? (
            <p className="text-red-500 mb-2">Error Message: {error.message}</p>
          ) : (
            <>
              <p className="text-red-500 mb-2">Error Message:</p>
              <pre className="whitespace-pre-wrap bg-red-100 p-4 rounded-md overflow-auto">
                {JSON.stringify(error, null, 2)}
              </pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;
