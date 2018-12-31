import * as AWS from "aws-sdk";

import {Env} from "../env";

/**
 * AWS S3
 */
export class S3 {
  /**
   * Create client
   * @param createBucket Create bucket?
   * @throws Error
   */
  public static async createClient(createBucket: boolean = true): Promise<AWS.S3> {
    const s3 = new AWS.S3({
      accessKeyId: Env.AWS_ACCESS_KEY_ID,
      endpoint: Env.AWS_ENDPOINT,
      secretAccessKey: Env.AWS_SECRET_ACCESS_KEY,
    });

    if (createBucket) {
      try {
        await s3.headBucket({
          Bucket: Env.AWS_S3_BUCKET,
        }).promise();
      } catch (error) {
        await s3.createBucket({
          Bucket: Env.AWS_S3_BUCKET,
        }).promise();
      }
    }

    return s3;
  }

  /**
   * Empty bucket
   * @param deleteBucket Delete bucket?
   * @throws Error
   */
  public static async emptyBucket(deleteBucket: boolean = false): Promise<void> {
    const s3 = await S3.createClient(false);

    try {
      await s3.headBucket({
        Bucket: Env.AWS_S3_BUCKET,
      }).promise();
    } catch (error) {
      return;
    }

    let objects = await s3.listObjects({
      Bucket: Env.AWS_S3_BUCKET,
    }).promise();

    while (true) {
      for (const item of objects.Contents || []) {
        await s3.deleteObject({
          Bucket: Env.AWS_S3_BUCKET,
          Key: item.Key as string,
        }).promise();
      }

      if (objects.IsTruncated) {
        objects = objects = await s3.listObjects({
          Bucket: Env.AWS_S3_BUCKET,
          Marker: objects.NextMarker,
        }).promise();
      } else {
        break;
      }
    }

    if (deleteBucket) {
      await s3.deleteBucket({
        Bucket: Env.AWS_S3_BUCKET,
      }).promise();
    }
  }
}
