import boto3

s3 = boto3.resource('s3')
# for bucket in s3.buckets.all():
#     print(f'\t{bucket.name}')

    
def put(s3, bucket, obj):
    data = open(obj,'rb')
    s3.Bucket(bucket).put_object(Key=obj, Body=data)


# client_file = '../mlab/ndt7-js/client.html'
client_file = 'client.html'
#ndt_bucket = 'siads673'
ndt_bucket = 'ndt7'
put(s3,ndt_bucket, client_file)

