import { useState } from 'react'
import { useProducts } from '../../lib/queries'
import {
  Container,
  Stack,
  Card,
  CardContent,
  Button,
  Badge,
  Spinner,
  Alert,
  SearchBar,
  Chip,
  ChipGroup,
  ListEmptyState,
} from '../../templates'
import { ShoppingCart, Search } from 'lucide-react'

/**
 * Products Page - E-commerce Template
 *
 * Features:
 * - Product grid
 * - Search products
 * - Filter by category
 * - Price display
 * - Add to cart action
 */

export function ProductsPage() {
  const { data: products, isLoading, error } = useProducts()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', 'clothing', 'accessories', 'shoes', 'bags']

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Container size="lg" padding="none">
      <Stack direction="vertical" spacing="none">
        {/* Header */}
        <Card variant="default" padding="md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-mono text-fg-0">
                Products
              </h1>
              <p className="text-xs sm:text-sm text-fg-2 mt-1">
                {products?.length || 0} items available
              </p>
            </div>
            <Button variant="outline" leftIcon={<ShoppingCart size={18} />}>
              Cart (0)
            </Button>
          </div>
        </Card>

        {/* Search & Filters */}
        <div className="p-4 space-y-3">
          <SearchBar
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            fullWidth
          />

          <div>
            <p className="text-xs text-fg-2 mb-2">Category</p>
            <ChipGroup>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  variant={selectedCategory === category ? 'primary' : 'default'}
                  onClick={() => setSelectedCategory(category)}
                  clickable
                />
              ))}
            </ChipGroup>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="px-4">
            <Alert variant="error" title="Error" description={error.message} />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" color="brand" />
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && filteredProducts && (
          <>
            {filteredProducts.length === 0 ? (
              <ListEmptyState
                icon={<Search size={48} className="text-fg-3" />}
                title="No products found"
                description="Try a different search or category"
                action={
                  <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all') }}>
                    Clear Filters
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} variant="elevated" padding="none">
                    {/* Product Image */}
                    <div className="aspect-square bg-bg-2 relative">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-fg-3">
                          No Image
                        </div>
                      )}
                      {product.stock === 0 && (
                        <Badge
                          variant="error"
                          className="absolute top-2 right-2"
                        >
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    <CardContent>
                      <Stack direction="vertical" spacing="sm">
                        {/* Product Info */}
                        <div>
                          <h3 className="text-sm font-medium text-fg-0 line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-xs text-fg-2 mt-1">
                            {product.category}
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-mono text-brand">
                            ${product.price}
                          </span>
                          <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<ShoppingCart size={14} />}
                            disabled={product.stock === 0}
                          >
                            Add
                          </Button>
                        </div>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </Stack>
    </Container>
  )
}
