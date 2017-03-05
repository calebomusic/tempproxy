# TempProxy

[TempProxy live](http://shmasana.herokuapp.com/)
![TempProxy!](https://github.com/calebomusic/Shmasana/blob/master/docs/screenshots/charles.png)

TempProxy allows you to create temporary links to proxied site. Perhaps you're interviewing a candidate and want to send a temporary link to a document whose location you want hidden. Perhaps you want to preview your ephemeral art for 15 minutes. If so, TempProxy is for you!

Built with Ruby on Rails, React, Redux, Redis, Curb, and PostgresSQL.

## Architecture

Picture

The picture above captures the data flow and back-end architecture of the app.

When a `Proxy` is created two events occur: first, a proxy is saved to the database (with a `destination_url`, `lifespan`, and time stamp properties), second, a job to crawl the destination_url is added to the job queue. A worker then pulls the job off the job queue, sending a get request the `destination_url`, say, example.com. Example.com will then respond, on success, the body of the response will be cached in Redis and the proxy will be saved as successfully crawled. When a user visits a `temp_link` of the proxy, the body of the proxied page is retrieved from the cache and displayed for the users viewing pleasure (so long as link has not exhausted its lifespan).

## Snippets

In more detail, when a request to create a proxy is received, this is handled by the create action in the `Api::Proxy` controller:

```ruby
def create
  @proxy = Proxy.new(proxy_params)

  if @proxy.save
    @proxy.enqueue_task
    create_temp_link(@proxy)
    render :show
  else
    render json: @proxy.errors.full_messages
  end
end
```

The `enqueue_task` method, enqueue's a `Crawl` task into the job queue. A worker dequeues the task performing:

```ruby
def self.perform(proxy_id)
  begin
    proxy = Proxy.find_by_id(proxy_id)
    http = Curl.get(proxy.destination_url)

    proxy.crawl_success = true
    proxy.save
    $redis.hset('proxy_pages', proxy.id, http.body_str)
  rescue => e
    proxy.crawl_success = false
    proxy.save
    p e
  end
```

First, the `destination_url` is read off the proxy object, then a get request is sent to the `destination_url`. The crawl is marked successful, the proxy saved (as successfully crawled), and then the body of the the response is cached in the Redis instance. If the crawl fails, the proxy is saved (as unsuccessfully crawled), and the error returned.

## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project.  The next steps for TempProxy are:

### Fix Asset Failure
Often, not all assets of the proxied site will be rendered, due to their links being relative. I'm currently working on a function to rewrite asset scripts to absolute links, so that they are fetched from the original location.

### Keep All Links in House
Several links will take the user away from the TempProxy.com because they escape being unwritten. An efficient algorithm, with more extensive coverage should keep the user in the TempProxy, no matter what link they click on.
