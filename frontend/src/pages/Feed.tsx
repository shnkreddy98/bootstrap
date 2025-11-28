import { useState } from 'react'
import { usePosts, useCreatePost } from '../lib/queries'
import {
  Container,
  Stack,
  Card,
  Button,
  Avatar,
  Spinner,
  Alert,
  ListEmptyState,
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetBody,
  Textarea,
} from '../templates'
import { Plus, Heart, MessageCircle, Share2 } from 'lucide-react'

/**
 * Feed Page - Social Feed Template
 *
 * Features:
 * - Post list with images
 * - Like/comment counts
 * - Create new post
 * - User avatars
 * - Engagement actions
 */

export function FeedPage() {
  const { data: posts, isLoading, error } = usePosts()
  const createPost = useCreatePost()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newPost, setNewPost] = useState('')

  const handleCreatePost = () => {
    if (newPost.trim()) {
      createPost.mutate({ content: newPost.trim() })
      setNewPost('')
      setIsCreateOpen(false)
    }
  }

  return (
    <Container size="md" padding="none">
      <Stack direction="vertical" spacing="none">
        {/* Header */}
        <Card variant="default" padding="md">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-mono text-fg-0">Feed</h1>
            <Button
              variant="primary"
              leftIcon={<Plus size={18} />}
              onClick={() => setIsCreateOpen(true)}
            >
              New Post
            </Button>
          </div>
        </Card>

        {/* Error State */}
        {error && (
          <div className="p-4">
            <Alert variant="error" title="Error" description={error.message} />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" color="brand" />
          </div>
        )}

        {/* Feed */}
        {!isLoading && posts && (
          <>
            {posts.length === 0 ? (
              <ListEmptyState
                icon={<MessageCircle size={48} className="text-fg-3" />}
                title="No posts yet"
                description="Be the first to share something"
                action={
                  <Button
                    variant="primary"
                    leftIcon={<Plus size={18} />}
                    onClick={() => setIsCreateOpen(true)}
                  >
                    Create Post
                  </Button>
                }
              />
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <div className="flex gap-3 p-4">
                      <Avatar
                        src={post.userAvatar}
                        fallback={post.userName[0]}
                        size="lg"
                      />
                      <div className="flex-1">
                        {/* User Info */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-fg-0">
                            {post.userName}
                          </span>
                          <span className="text-xs text-fg-2">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Post Content */}
                        <p className="text-sm text-fg-1 mb-3">{post.content}</p>

                        {/* Post Image (if exists) */}
                        {post.imageUrl && (
                          <img
                            src={post.imageUrl}
                            alt="Post"
                            className="w-full rounded border border-border-0 mb-3"
                          />
                        )}

                        {/* Engagement */}
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1.5 text-fg-2 hover:text-error transition-colors">
                            <Heart size={18} />
                            <span className="text-xs">{post.likes || 0}</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-fg-2 hover:text-brand transition-colors">
                            <MessageCircle size={18} />
                            <span className="text-xs">{post.comments || 0}</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-fg-2 hover:text-brand transition-colors">
                            <Share2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </Stack>

      {/* Create Post Bottom Sheet */}
      <BottomSheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <BottomSheetContent showHandle>
          <BottomSheetHeader>
            <BottomSheetTitle>Create Post</BottomSheetTitle>
          </BottomSheetHeader>
          <BottomSheetBody>
            <Stack direction="vertical" spacing="lg">
              <Textarea
                label="What's on your mind?"
                placeholder="Share something..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={5}
                autoFocus
              />
              <Button
                variant="primary"
                fullWidth
                leftIcon={<Plus size={18} />}
                onClick={handleCreatePost}
                disabled={!newPost.trim() || createPost.isPending}
                loading={createPost.isPending}
              >
                Post
              </Button>
            </Stack>
          </BottomSheetBody>
        </BottomSheetContent>
      </BottomSheet>
    </Container>
  )
}
