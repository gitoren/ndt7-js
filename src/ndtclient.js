
async function run_speedtest() {
    var results = {};
    var x = ndt7.test(
            {
                userAcceptedDataPolicy: true,
                downloadworkerfile: "src/ndt7-download-worker.js",
                uploadworkerfile: "src/ndt7-upload-worker.js",
                metadata: {
                    client_name: 'ndt7-html-example',
                },
            },
            {
                serverChosen: function (server) {
                    console.log('Testing to:', {
                        machine: server.machine,
                        locations: server.location,
                    });
		    results['server'] = server.machine;
		    results['location'] = server.location.city;
		    results['country'] = server.location.country;
                    document.getElementById('server').innerHTML = 'Testing to: ' + server.machine + ' (' + server.location.city + ')';
                },
                downloadMeasurement: function (data) {
                    if (data.Source === 'client') {
                        document.getElementById('download').innerHTML = 'Download: ' + data.Data.MeanClientMbps.toFixed(2) + ' Mb/s';
                    }
                },
                downloadComplete: function (data) {
                    // (bytes/second) * (bits/byte) / (megabits/bit) = Mbps
                    const serverBw = data.LastServerMeasurement.BBRInfo.BW * 8 / 1000000;
                    const clientGoodput = data.LastClientMeasurement.MeanClientMbps;

		    results['dl_elpased_time'] = data.LastClientMeasurement.ElapsedTime;
		    results['dl_client_mbps'] = data.LastClientMeasurement.MeanClientMbps;
    		    results['dl_num_bytes'] = data.LastClientMeasurement.NumBytes;
		    results['dl_server_bw'] = serverBw;
		    
                    console.log(
                        `Download test is complete:
    Instantaneous server bottleneck bandwidth estimate: ${serverBw} Mbps
    Mean client goodput: ${clientGoodput} Mbps`);
                    document.getElementById('download').innerHTML = 'Download: ' + clientGoodput.toFixed(2) + ' Mb/s';
                },
                uploadMeasurement: function (data) {
                    if (data.Source === 'server') {
                        document.getElementById('upload').innerHTML = 'Upload: ' + (data.Data.TCPInfo.BytesReceived /
                            data.Data.TCPInfo.ElapsedTime * 8).toFixed(2) + ' Mb/s';;
                    }
                },
                uploadComplete: function(data) {
                    const bytesReceived = data.LastServerMeasurement.TCPInfo.BytesReceived;
                    const elapsed = data.LastServerMeasurement.TCPInfo.ElapsedTime;
                    // bytes * bits/byte / microseconds = Mbps
                    const throughput =
			  bytesReceived * 8 / elapsed;
		    
		    results['ul_bytes_received'] =  data.LastServerMeasurement.TCPInfo.BytesReceived;
		    results['ul_elapsed_time'] =  data.LastServerMeasurement.TCPInfo.ElapsedTime;
		    results['ul_througput']=  throughput;

                    console.log(
                        `Upload test completed in ${(elapsed / 1000000).toFixed(2)}s
        Mean server throughput: ${throughput} Mbps`);
                },
                error: function (err) {
                    console.log('Error while running the test:', err.message);
                },
            },
       ).then((exitcode) => {
            console.log("ndt7 test completed with exit code:", exitcode);
       });
    return results;
}

run_speedtest()
    .then((data) => console.log('Final Answer: ', data));      



