import { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import type { Product, Category } from "@shared/schema";
import {
  Search, X, Plus, Pencil, Trash2, Loader2, ArrowLeft, Save,
  ToggleLeft, ToggleRight, Package, CheckSquare, Square,
  FolderOpen, ChevronDown, ChevronUp, Tag, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const TOKEN_KEY = "ableys-admin-token";
function authHeaders(): Record<string, string> {
  const token = sessionStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}
async function adminFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...authHeaders(), ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

interface CollectionRow {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  productCount: number;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getFirstImage(p: Product): string | null {
  try {
    const imgs = JSON.parse(p.images || "[]");
    return imgs[0] || null;
  } catch { return null; }
}

// ── Read-only product list for category view ──────────────────────────────
function CategoryProductList({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const lower = search.toLowerCase();
  const filtered = search
    ? products.filter(p => p.name.toLowerCase().includes(lower) || (p.sku || "").toLowerCase().includes(lower))
    : products;

  return (
    <div className="space-y-3 pt-1">
      {products.length > 6 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search within category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm"
            data-testid="input-category-product-search"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
      )}
      <div className="border rounded-lg overflow-hidden">
        <div className="max-h-72 overflow-y-auto divide-y divide-border/40">
          {filtered.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">No products{search ? ` matching "${search}"` : ""}</div>
          ) : (
            filtered.map(p => {
              const img = getFirstImage(p);
              return (
                <div key={p.id} className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-muted/30 transition-colors" data-testid={`category-product-${p.id}`}>
                  <div className="w-9 h-9 rounded bg-muted flex-shrink-0 overflow-hidden">
                    {img
                      ? <img src={img} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><Package className="w-3.5 h-3.5 text-muted-foreground/40" /></div>
                    }
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate text-foreground leading-tight">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.sku || "No SKU"}</div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xs font-medium text-foreground">₹{p.basePrice.toLocaleString()}</div>
                    <div className={`text-xs ${p.isActive ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                      {p.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {search && (
        <p className="text-xs text-muted-foreground">{filtered.length} of {products.length} products</p>
      )}
    </div>
  );
}

// ── Expandable category row ───────────────────────────────────────────────
function CategoryRow({ category, allProducts }: { category: Category; allProducts: Product[] }) {
  const [expanded, setExpanded] = useState(false);
  const categoryProducts = useMemo(
    () => allProducts.filter(p => p.categorySlug === category.slug),
    [allProducts, category.slug]
  );

  const CATEGORY_COLORS: Record<string, string> = {
    swings: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
    ballpool: "bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300",
    mats: "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300",
    "movement-balance": "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
    climbing: "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300",
    "adl-kit": "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300",
    "therapy-balls": "bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300",
    "deep-pressure": "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
    visual: "bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300",
  };
  const colorClass = CATEGORY_COLORS[category.slug] || "bg-muted text-muted-foreground";

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden" data-testid={`category-row-${category.id}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer touch-manipulation text-left"
        data-testid={`button-expand-category-${category.slug}`}
      >
        <div className="flex-shrink-0">
          {category.image ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img src={category.image} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
              <Tag className="w-4 h-4" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground text-sm">{category.title}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${colorClass}`}>sync</span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <code className="text-xs text-muted-foreground">{category.slug}</code>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Package className="w-3 h-3" />
              {categoryProducts.length} products
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
            category.isActive
              ? "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400"
              : "bg-gray-100 dark:bg-gray-800/40 text-gray-500"
          }`}>
            {category.isActive ? "Active" : "Inactive"}
          </span>
          {expanded
            ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
            : <ChevronDown className="w-4 h-4 text-muted-foreground" />
          }
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border/40 bg-muted/10 px-4 pb-4 pt-3">
          {categoryProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-3 text-center">
              No active products in this category. Products are assigned by the Shopify sync.
            </p>
          ) : (
            <CategoryProductList products={categoryProducts} />
          )}
        </div>
      )}
    </div>
  );
}

// ── Product mapper for custom collections ─────────────────────────────────
function ProductMapper({
  collectionId,
  onClose,
}: {
  collectionId: number;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [page, setPage] = useState(0);

  const allProductsQuery = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
    queryFn: () => adminFetch("/api/admin/products"),
  });

  const mappedQuery = useQuery<{ productIds: number[] }>({
    queryKey: ["/api/admin/collections", collectionId, "products"],
    queryFn: () => adminFetch(`/api/admin/collections/${collectionId}/products`),
  });

  useEffect(() => {
    if (mappedQuery.data && !initialLoaded) {
      setSelectedIds(new Set(mappedQuery.data.productIds));
      setInitialLoaded(true);
    }
  }, [mappedQuery.data, initialLoaded]);

  const saveMutation = useMutation({
    mutationFn: () =>
      adminFetch(`/api/admin/collections/${collectionId}/products`, {
        method: "POST",
        body: JSON.stringify({ productIds: Array.from(selectedIds) }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/collections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/collections", collectionId, "products"] });
      toast({ title: "Saved", description: `${selectedIds.size} products mapped to this collection.` });
      onClose();
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const products = allProductsQuery.data || [];
  const searchLower = search.toLowerCase();
  const filtered = useMemo(() => {
    if (!searchLower) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      (p.sku && p.sku.toLowerCase().includes(searchLower)) ||
      p.slug.toLowerCase().includes(searchLower)
    );
  }, [products, searchLower]);

  const PAGE_SIZE = 30;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => { setPage(0); }, [searchLower]);

  const toggle = useCallback((id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  if (allProductsQuery.isLoading || mappedQuery.isLoading) {
    return <div className="flex items-center justify-center py-12"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{selectedIds.size}</span> selected
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setSelectedIds(new Set(filtered.map(p => p.id)))} className="cursor-pointer touch-manipulation text-xs" data-testid="button-select-all-products">
            Select All ({filtered.length})
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedIds(new Set())} className="cursor-pointer touch-manipulation text-xs" data-testid="button-deselect-all-products">
            Clear
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, SKU, or slug..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 pr-9"
          data-testid="input-product-mapper-search"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden bg-card max-h-[420px] overflow-y-auto">
        {paginated.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No products found{search ? ` matching "${search}"` : ""}</div>
        ) : (
          <div className="divide-y divide-border/50">
            {paginated.map(p => {
              const img = getFirstImage(p);
              const isSelected = selectedIds.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors cursor-pointer touch-manipulation hover:bg-muted/40 ${isSelected ? "bg-primary/5" : ""}`}
                  data-testid={`product-mapping-row-${p.id}`}
                >
                  <div className="flex-shrink-0">
                    {isSelected
                      ? <CheckSquare className="w-5 h-5 text-primary" />
                      : <Square className="w-5 h-5 text-muted-foreground/50" />
                    }
                  </div>
                  <div className="w-10 h-10 rounded bg-muted flex-shrink-0 overflow-hidden">
                    {img
                      ? <img src={img} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><Package className="w-4 h-4 text-muted-foreground/40" /></div>
                    }
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate text-foreground">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.sku || "No SKU"} · {p.categorySlug}</div>
                  </div>
                  <div className="text-xs text-muted-foreground flex-shrink-0">₹{p.basePrice.toLocaleString()}</div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Page {page + 1} of {totalPages} ({filtered.length} products)</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)} className="cursor-pointer touch-manipulation" data-testid="button-products-prev-page">Previous</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} className="cursor-pointer touch-manipulation" data-testid="button-products-next-page">Next</Button>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="gap-2 cursor-pointer touch-manipulation" data-testid="button-save-product-mappings">
          {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Mappings ({selectedIds.size})
        </Button>
      </div>
    </div>
  );
}

// ── Sync Categories sub-view ──────────────────────────────────────────────
function SyncCategoriesView() {
  const categoriesQuery = useQuery<Category[]>({
    queryKey: ["/api/admin/categories"],
    queryFn: () => adminFetch("/api/admin/categories"),
  });

  const allProductsQuery = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
    queryFn: () => adminFetch("/api/admin/products"),
  });

  const isLoading = categoriesQuery.isLoading || allProductsQuery.isLoading;
  const categories = categoriesQuery.data || [];
  const allProducts = allProductsQuery.data || [];

  const productCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of allProducts) {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
    }
    return counts;
  }, [allProducts]);

  const totalProducts = useMemo(() =>
    allProducts.filter(p => p.isActive).length,
    [allProducts]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <p className="text-sm text-muted-foreground">
            {categories.length} categories · {totalProducts} active products — assigned automatically by the Shopify sync engine.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
          <RefreshCw className="w-3 h-3" />
          Sync-managed · read-only
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-2.5">
          {categories.map(cat => (
            <CategoryRow key={cat.id} category={cat} allProducts={allProducts} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Custom Collections sub-view ───────────────────────────────────────────
function CustomCollectionsView() {
  const { toast } = useToast();
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showMapper, setShowMapper] = useState(false);
  const [search, setSearch] = useState("");

  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [autoSlug, setAutoSlug] = useState(true);

  const collectionsQuery = useQuery<CollectionRow[]>({
    queryKey: ["/api/admin/collections"],
    queryFn: () => adminFetch("/api/admin/collections"),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) =>
      adminFetch("/api/admin/collections", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/collections"] });
      toast({ title: "Created", description: "Collection created successfully." });
      resetForm();
      setView("list");
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      adminFetch(`/api/admin/collections/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/collections"] });
      toast({ title: "Updated", description: "Collection updated." });
      if (!showMapper) { resetForm(); setView("list"); }
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      adminFetch(`/api/admin/collections/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/collections"] });
      toast({ title: "Deleted", description: "Collection deleted." });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  function resetForm() {
    setFormTitle(""); setFormSlug(""); setFormDescription("");
    setFormImageUrl(""); setFormIsActive(true); setAutoSlug(true);
    setEditingId(null); setShowMapper(false);
  }

  function openCreate() { resetForm(); setView("form"); }

  function openEdit(col: CollectionRow) {
    setEditingId(col.id); setFormTitle(col.title); setFormSlug(col.slug);
    setFormDescription(col.description || ""); setFormImageUrl(col.imageUrl || "");
    setFormIsActive(col.isActive); setAutoSlug(false); setShowMapper(false);
    setView("form");
  }

  function handleSubmit() {
    const data = {
      title: formTitle.trim(), slug: formSlug.trim(),
      description: formDescription.trim() || null,
      imageUrl: formImageUrl.trim() || null,
      isActive: formIsActive,
    };
    if (!data.title || !data.slug) {
      toast({ title: "Validation", description: "Title and slug are required.", variant: "destructive" });
      return;
    }
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  }

  const collections = collectionsQuery.data || [];
  const searchLower = search.toLowerCase();
  const filtered = searchLower
    ? collections.filter(c =>
        c.title.toLowerCase().includes(searchLower) ||
        c.slug.toLowerCase().includes(searchLower)
      )
    : collections;

  if (view === "form") {
    return (
      <div className="space-y-5 max-w-3xl">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => { resetForm(); setView("list"); }} className="gap-1.5 cursor-pointer touch-manipulation" data-testid="button-back-to-collections">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h3 className="text-base font-semibold text-foreground">
            {editingId ? "Edit Collection" : "New Collection"}
          </h3>
        </div>

        <div className="bg-card rounded-xl border border-border/50 p-5 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input value={formTitle} onChange={e => { setFormTitle(e.target.value); if (autoSlug) setFormSlug(slugify(e.target.value)); }} placeholder="e.g. Best Sellers" data-testid="input-collection-title" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Handle / Slug</label>
            <Input value={formSlug} onChange={e => { setFormSlug(e.target.value); setAutoSlug(false); }} placeholder="e.g. best-sellers" data-testid="input-collection-slug" />
            <p className="text-xs text-muted-foreground">URL-friendly identifier. Auto-generated from title.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea value={formDescription} onChange={e => setFormDescription(e.target.value)} placeholder="Brief description..." rows={3} data-testid="input-collection-description" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Image URL</label>
            <Input value={formImageUrl} onChange={e => setFormImageUrl(e.target.value)} placeholder="https://cdn.shopify.com/..." data-testid="input-collection-image" />
            {formImageUrl && (
              <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border bg-muted">
                <img src={formImageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <button onClick={() => setFormIsActive(!formIsActive)} className="flex items-center gap-2 text-sm cursor-pointer touch-manipulation" data-testid="toggle-collection-active">
            {formIsActive
              ? <ToggleRight className="w-6 h-6 text-green-500" />
              : <ToggleLeft className="w-6 h-6 text-muted-foreground" />
            }
            <span className={formIsActive ? "text-green-600 font-medium" : "text-muted-foreground"}>
              {formIsActive ? "Active" : "Inactive"}
            </span>
          </button>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending} className="gap-2 cursor-pointer touch-manipulation" data-testid="button-save-collection">
              {(createMutation.isPending || updateMutation.isPending) ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editingId ? "Update Collection" : "Create Collection"}
            </Button>
            <Button variant="outline" onClick={() => { resetForm(); setView("list"); }} className="cursor-pointer touch-manipulation" data-testid="button-cancel-collection">
              Cancel
            </Button>
          </div>
        </div>

        {editingId && (
          <div className="bg-card rounded-xl border border-border/50 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Mapped Products</h3>
              {!showMapper && (
                <Button variant="outline" size="sm" onClick={() => setShowMapper(true)} className="gap-2 cursor-pointer touch-manipulation" data-testid="button-manage-products">
                  <Package className="w-4 h-4" />
                  Manage Products
                </Button>
              )}
            </div>
            {showMapper ? (
              <ProductMapper collectionId={editingId} onClose={() => setShowMapper(false)} />
            ) : (
              <p className="text-sm text-muted-foreground">Click "Manage Products" to assign or remove products from this collection.</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-muted-foreground">
          {collections.length} manually curated collection{collections.length !== 1 ? "s" : ""}
        </p>
        <Button onClick={openCreate} className="gap-2 cursor-pointer touch-manipulation" data-testid="button-create-collection">
          <Plus className="w-4 h-4" />
          New Collection
        </Button>
      </div>

      {collections.length > 5 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search collections..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" data-testid="input-search-collections" />
        </div>
      )}

      {collectionsQuery.isLoading ? (
        <div className="flex items-center justify-center py-14">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-14 space-y-3">
          <FolderOpen className="w-12 h-12 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground">{search ? `No collections matching "${search}"` : "No custom collections yet"}</p>
          {!search && (
            <Button onClick={openCreate} variant="outline" className="gap-2 cursor-pointer touch-manipulation" data-testid="button-create-first-collection">
              <Plus className="w-4 h-4" />
              Create your first collection
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-testid="table-collections">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Collection</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Slug</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Products</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filtered.map(col => (
                  <tr key={col.id} className="hover:bg-muted/20 transition-colors" data-testid={`collection-row-${col.id}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                          {col.imageUrl
                            ? <img src={col.imageUrl} alt="" className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center"><FolderOpen className="w-4 h-4 text-muted-foreground/40" /></div>
                          }
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate text-foreground">{col.title}</div>
                          {col.description && <div className="text-xs text-muted-foreground truncate max-w-[200px]">{col.description}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <code className="text-xs bg-muted/60 px-1.5 py-0.5 rounded text-muted-foreground">{col.slug}</code>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Package className="w-3 h-3" />
                        {col.productCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        col.isActive
                          ? "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-800/40 text-gray-500"
                      }`}>
                        {col.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(col)} className="gap-1.5 cursor-pointer touch-manipulation" data-testid={`button-edit-collection-${col.id}`}>
                          <Pencil className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="ghost" size="sm"
                          onClick={() => {
                            if (window.confirm(`Delete "${col.title}"? This will also remove all product mappings.`)) {
                              deleteMutation.mutate(col.id);
                            }
                          }}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer touch-manipulation"
                          data-testid={`button-delete-collection-${col.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main tab component ────────────────────────────────────────────────────
type SubTab = "categories" | "collections";

export default function CollectionsView() {
  const [subTab, setSubTab] = useState<SubTab>("categories");

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground" data-testid="heading-collections">Collections & Categories</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Manage product groupings for your storefront</p>
      </div>

      <div className="flex border-b border-border/50 gap-1">
        <button
          onClick={() => setSubTab("categories")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer touch-manipulation border-b-2 -mb-px ${
            subTab === "categories"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-testid="tab-sync-categories"
        >
          <span className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Sync Categories
          </span>
        </button>
        <button
          onClick={() => setSubTab("collections")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer touch-manipulation border-b-2 -mb-px ${
            subTab === "collections"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-testid="tab-custom-collections"
        >
          <span className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Custom Collections
          </span>
        </button>
      </div>

      <div>
        {subTab === "categories" && <SyncCategoriesView />}
        {subTab === "collections" && <CustomCollectionsView />}
      </div>
    </div>
  );
}
