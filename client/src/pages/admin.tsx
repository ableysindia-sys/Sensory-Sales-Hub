import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import type { Lead, Product, Category, Page } from "@shared/schema";
import { formatPrice } from "@/lib/product-provider";
import {
  LayoutDashboard,
  Users,
  Search,
  X,
  ChevronDown,
  Trash2,
  Eye,
  Mail,
  Phone,
  Building2,
  MapPin,
  ShoppingCart,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  LogOut,
  Lock,
  Loader2,
  ArrowLeft,
  Filter,
  Tag,
  Package,
  FileText,
  Plus,
  Pencil,
  Image,
  ToggleLeft,
  ToggleRight,
  Save,
  ChevronUp,
  Box,
  AlertTriangle,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import logoPath from "@assets/ableys_rehab_logo.png";

const TOKEN_KEY = "ableys-admin-token";

function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
  const token = getToken();
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

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: typeof Clock }> = {
  new: { label: "New", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800", icon: Clock },
  contacted: { label: "Contacted", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800", icon: MessageSquare },
  converted: { label: "Converted", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800", icon: CheckCircle2 },
  closed: { label: "Closed", color: "text-gray-500 dark:text-gray-400", bg: "bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700", icon: XCircle },
};

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.color}`} data-testid={`badge-status-${status}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

function formatDate(date: string | Date | null): string {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const { toast } = useToast();
  const loginSchema = z.object({ password: z.string().min(1, "Password is required") });
  const form = useForm({ resolver: zodResolver(loginSchema), defaultValues: { password: "" } });

  const loginMutation = useMutation({
    mutationFn: async (data: { password: string }) => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      setToken(data.token);
      onLogin();
    },
    onError: (err: Error) => {
      toast({ title: "Login Failed", description: err.message, variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-card rounded-2xl border border-border/50 shadow-xl p-8" data-testid="admin-login-card">
          <div className="text-center mb-8">
            <img src={logoPath} alt="Abley's Rehab" className="h-10 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-foreground" data-testid="heading-admin-login">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter your password to continue</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((d) => loginMutation.mutate(d))} className="space-y-4" data-testid="form-admin-login">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input type="password" placeholder="Enter admin password" className="pl-10 rounded-xl h-11" data-testid="input-admin-password" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-xl h-11 cursor-pointer touch-manipulation" disabled={loginMutation.isPending} data-testid="button-admin-login">
                {loginMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                Sign In
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
}

function DashboardView() {
  const { data: stats, isLoading, refetch: refetchStats } = useQuery<any>({
    queryKey: ["/api/admin/stats"],
    queryFn: () => adminFetch("/api/admin/stats"),
    refetchInterval: 30000,
  });

  const { data: recentLeads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/admin/leads"],
    queryFn: () => adminFetch("/api/admin/leads"),
  });

  const syncMutation = useMutation({
    mutationFn: () => adminFetch("/api/admin/shopify-sync", { method: "POST" }),
    onSuccess: () => {
      refetchStats();
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
    },
  });

  const statCards = [
    { label: "Total Leads", value: stats?.total ?? 0, icon: Users, color: "text-primary", bg: "bg-primary/10" },
    { label: "New", value: stats?.new ?? 0, icon: Clock, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
    { label: "Products", value: stats?.totalProducts ?? 0, icon: Package, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30" },
    { label: "Low Stock", value: stats?.lowStock ?? 0, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30" },
  ];

  return (
    <div className="space-y-6" data-testid="section-dashboard">
      <div>
        <h2 className="text-2xl font-bold text-foreground" data-testid="heading-dashboard">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">Overview of your store</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl border border-border/50 p-4 sm:p-5"
            data-testid={`stat-card-${card.label.toLowerCase().replace(/\s/g, "-")}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${isLoading ? "animate-pulse" : ""}`} data-testid={`stat-value-${card.label.toLowerCase().replace(/\s/g, "-")}`}>
              {isLoading ? "—" : card.value}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Shopify Sync Panel */}
      <div className="bg-card rounded-xl border border-border/50 p-5 flex flex-col sm:flex-row sm:items-center gap-4" data-testid="section-shopify-sync">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/30 flex items-center justify-center flex-shrink-0">
            <RefreshCw className={`w-5 h-5 text-green-600 ${syncMutation.isPending ? "animate-spin" : ""}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Shopify Product Sync</p>
            <p className="text-xs text-muted-foreground">
              {syncMutation.isPending
                ? "Syncing products from Shopify…"
                : syncMutation.isSuccess
                ? `Sync complete — ${(syncMutation.data as any)?.total ?? 0} products up to date`
                : syncMutation.isError
                ? "Sync failed — try again"
                : "Auto-syncs every 10 minutes. Run manually to pick up newly published products immediately."}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant={syncMutation.isSuccess ? "outline" : "default"}
          className="rounded-full gap-2 flex-shrink-0"
          onClick={() => syncMutation.mutate()}
          disabled={syncMutation.isPending}
          data-testid="button-sync-shopify"
        >
          {syncMutation.isPending ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Syncing…</>
          ) : syncMutation.isSuccess ? (
            <><CheckCircle className="w-3.5 h-3.5 text-green-600" /> Synced</>
          ) : (
            <><RefreshCw className="w-3.5 h-3.5" /> Sync Now</>
          )}
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border/50 p-5" data-testid="section-recent-leads">
        <h3 className="text-base font-semibold text-foreground mb-4">Recent Enquiries</h3>
        {leadsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : !recentLeads || recentLeads.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">No enquiries yet</p>
        ) : (
          <div className="space-y-3">
            {recentLeads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors" data-testid={`recent-lead-${lead.id}`}>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                </div>
                <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                  <StatusBadge status={lead.status} />
                  <span className="text-xs text-muted-foreground hidden sm:block">{formatDate(lead.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LeadDetailView({ lead, onBack, onStatusChange }: { lead: Lead; onBack: () => void; onStatusChange: (id: number, status: string) => void }) {
  return (
    <div className="space-y-6" data-testid="section-lead-detail">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="rounded-lg cursor-pointer touch-manipulation" data-testid="button-back-to-leads">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border/50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground" data-testid="text-lead-name">{lead.name}</h2>
            <p className="text-sm text-muted-foreground">Lead #{lead.id} &middot; {formatDate(lead.createdAt)}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={lead.status} />
            <Select defaultValue={lead.status} onValueChange={(v) => onStatusChange(lead.id, v)}>
              <SelectTrigger className="w-[140px] rounded-lg h-9 text-sm" data-testid="select-lead-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a href={`mailto:${lead.email}`} className="text-sm text-primary hover:underline" data-testid="text-lead-email">{lead.email}</a>
              </div>
            </div>
            {lead.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a href={`tel:${lead.phone}`} className="text-sm text-foreground" data-testid="text-lead-phone">{lead.phone}</a>
                </div>
              </div>
            )}
            {lead.organisation && (
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Organisation</p>
                  <p className="text-sm text-foreground" data-testid="text-lead-org">{lead.organisation}</p>
                </div>
              </div>
            )}
            {lead.city && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">City</p>
                  <p className="text-sm text-foreground" data-testid="text-lead-city">{lead.city}</p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {lead.interest && (
              <div className="flex items-start gap-3">
                <Tag className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Interest / Topic</p>
                  <p className="text-sm text-foreground" data-testid="text-lead-interest">{lead.interest}</p>
                </div>
              </div>
            )}
            {lead.category && (
              <div className="flex items-start gap-3">
                <Filter className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="text-sm text-foreground" data-testid="text-lead-category">{lead.category}</p>
                </div>
              </div>
            )}
            {lead.requirementType && (
              <div className="flex items-start gap-3">
                <ShoppingCart className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Requirement Type</p>
                  <p className="text-sm text-foreground" data-testid="text-lead-req-type">{lead.requirementType}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {lead.message && (
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Message</p>
            <p className="text-sm text-foreground whitespace-pre-wrap bg-muted/30 rounded-lg p-4" data-testid="text-lead-message">{lead.message}</p>
          </div>
        )}

        {lead.cartItems && (
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Cart / Enquiry Items</p>
            <p className="text-sm text-foreground whitespace-pre-wrap bg-muted/30 rounded-lg p-4 font-mono text-xs" data-testid="text-lead-cart">{lead.cartItems}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LeadsView() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const { data: leads, isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/admin/leads"],
    queryFn: () => adminFetch("/api/admin/leads"),
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return adminFetch(`/api/admin/leads/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    },
    onSuccess: (updatedLead) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      if (selectedLead?.id === updatedLead.id) setSelectedLead(updatedLead);
      toast({ title: "Status updated" });
    },
  });

  const deleteLead = useMutation({
    mutationFn: async (id: number) => adminFetch(`/api/admin/leads/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setSelectedLead(null);
      toast({ title: "Lead deleted" });
    },
  });

  const filtered = useMemo(() => {
    if (!leads) return [];
    let result = leads;
    if (statusFilter !== "all") result = result.filter((l) => l.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((l) =>
        l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) ||
        (l.phone && l.phone.toLowerCase().includes(q)) ||
        (l.organisation && l.organisation.toLowerCase().includes(q)) ||
        (l.city && l.city.toLowerCase().includes(q))
      );
    }
    return result;
  }, [leads, statusFilter, search]);

  if (selectedLead) {
    return <LeadDetailView lead={selectedLead} onBack={() => setSelectedLead(null)} onStatusChange={(id, status) => updateStatus.mutate({ id, status })} />;
  }

  return (
    <div className="space-y-5" data-testid="section-leads">
      <div>
        <h2 className="text-2xl font-bold text-foreground" data-testid="heading-leads">Leads & Enquiries</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage all enquiry submissions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, email, phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl h-10" data-testid="input-search-leads" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px] rounded-xl h-10" data-testid="select-filter-status">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-border/50">
          <AlertCircle className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No leads found</p>
          {(search || statusFilter !== "all") && (
            <Button variant="link" onClick={() => { setSearch(""); setStatusFilter("all"); }} className="mt-2 cursor-pointer" data-testid="button-clear-lead-filters">Clear filters</Button>
          )}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="hidden lg:grid grid-cols-[2fr_2fr_1fr_1.2fr_1fr_80px] gap-4 px-5 py-3 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/30">
            <span>Name</span><span>Email / Phone</span><span>Type</span><span>Date</span><span>Status</span><span></span>
          </div>
          <div className="divide-y divide-border/30">
            {filtered.map((lead) => (
              <div key={lead.id} className="px-5 py-4 hover:bg-muted/20 transition-colors cursor-pointer group" onClick={() => setSelectedLead(lead)} data-testid={`lead-row-${lead.id}`}>
                <div className="lg:grid lg:grid-cols-[2fr_2fr_1fr_1.2fr_1fr_80px] lg:gap-4 lg:items-center">
                  <div className="mb-1 lg:mb-0">
                    <p className="text-sm font-medium text-foreground truncate" data-testid={`text-lead-name-${lead.id}`}>{lead.name}</p>
                    {lead.organisation && <p className="text-xs text-muted-foreground truncate">{lead.organisation}</p>}
                  </div>
                  <div className="mb-1 lg:mb-0">
                    <p className="text-sm text-muted-foreground truncate">{lead.email}</p>
                    {lead.phone && <p className="text-xs text-muted-foreground truncate">{lead.phone}</p>}
                  </div>
                  <div className="mb-1 lg:mb-0"><p className="text-xs text-muted-foreground truncate">{lead.requirementType || lead.interest || "—"}</p></div>
                  <div className="mb-2 lg:mb-0"><p className="text-xs text-muted-foreground">{formatDate(lead.createdAt)}</p></div>
                  <div className="flex items-center justify-between lg:justify-start"><StatusBadge status={lead.status} /></div>
                  <div className="hidden lg:flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }} className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground cursor-pointer" data-testid={`button-view-lead-${lead.id}`}><Eye className="w-4 h-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); if (confirm("Delete this lead?")) deleteLead.mutate(lead.id); }} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-muted-foreground hover:text-red-600 cursor-pointer" data-testid={`button-delete-lead-${lead.id}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 bg-muted/20 border-t border-border/30">
            <p className="text-xs text-muted-foreground" data-testid="text-leads-count">{filtered.length} lead{filtered.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductForm({ product, categories, onSave, onCancel }: {
  product?: Product | null;
  categories: Category[];
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const isEdit = !!product;

  const parseJsonSafe = (val: string | null, fallback: any) => {
    if (!val) return fallback;
    try { return JSON.parse(val); } catch { return fallback; }
  };

  const [images, setImages] = useState<string[]>(parseJsonSafe(product?.images || null, []));
  const [features, setFeatures] = useState<string[]>(parseJsonSafe(product?.features || null, []));
  const [applications, setApplications] = useState<string[]>(parseJsonSafe(product?.applications || null, []));
  const [specKeys, setSpecKeys] = useState<{ key: string; value: string }[]>(() => {
    const specs = parseJsonSafe(product?.specifications || null, {});
    return Object.entries(specs).map(([key, value]) => ({ key, value: String(value) }));
  });
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newApplication, setNewApplication] = useState("");

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    categorySlug: z.string().min(1, "Category is required"),
    shortDescription: z.string().min(1, "Short description is required"),
    longDescription: z.string().optional(),
    basePrice: z.coerce.number().min(1, "Price must be greater than 0"),
    comparePrice: z.coerce.number().optional().nullable(),
    stock: z.coerce.number().optional().nullable(),
    isActive: z.boolean().default(true),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      categorySlug: product?.categorySlug || "",
      shortDescription: product?.shortDescription || "",
      longDescription: product?.longDescription || "",
      basePrice: product?.basePrice || 0,
      comparePrice: product?.comparePrice || null,
      stock: product?.stock ?? null,
      isActive: product?.isActive ?? true,
    },
  });

  const autoSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleSubmit = (data: any) => {
    const specs: Record<string, string> = {};
    specKeys.forEach(s => { if (s.key.trim()) specs[s.key.trim()] = s.value; });

    onSave({
      ...data,
      comparePrice: data.comparePrice || null,
      stock: data.stock === "" || data.stock === undefined || data.stock === null ? null : Number(data.stock),
      images: JSON.stringify(images),
      features: JSON.stringify(features),
      applications: JSON.stringify(applications),
      specifications: JSON.stringify(specs),
      configOptions: product?.configOptions || null,
    });
  };

  return (
    <div className="space-y-6" data-testid="section-product-form">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onCancel} className="rounded-lg cursor-pointer touch-manipulation" data-testid="button-back-products">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <h2 className="text-xl font-bold text-foreground">{isEdit ? "Edit Product" : "Add Product"}</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-5">
            <h3 className="text-base font-semibold text-foreground">Basic Info</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl><Input {...field} onChange={(e) => { field.onChange(e); if (!isEdit) form.setValue("slug", autoSlug(e.target.value)); }} data-testid="input-product-name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl><Input {...field} data-testid="input-product-slug" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="categorySlug" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger data-testid="select-product-category"><SelectValue placeholder="Select category" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c.id} value={c.slug}>{c.title}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="shortDescription" render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl><Textarea rows={2} {...field} data-testid="input-product-short-desc" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="longDescription" render={({ field }) => (
              <FormItem>
                <FormLabel>Long Description</FormLabel>
                <FormControl><Textarea rows={5} {...field} value={field.value || ""} data-testid="input-product-long-desc" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-5">
            <h3 className="text-base font-semibold text-foreground">Pricing & Inventory</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <FormField control={form.control} name="basePrice" render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price (₹)</FormLabel>
                  <FormControl><Input type="number" {...field} data-testid="input-product-price" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="comparePrice" render={({ field }) => (
                <FormItem>
                  <FormLabel>Compare Price (₹)</FormLabel>
                  <FormControl><Input type="number" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)} data-testid="input-product-compare-price" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="stock" render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock (blank = unlimited)</FormLabel>
                  <FormControl><Input type="number" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)} data-testid="input-product-stock" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="isActive" render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => field.onChange(!field.value)} className="cursor-pointer touch-manipulation" data-testid="toggle-product-active">
                    {field.value ? <ToggleRight className="w-8 h-8 text-green-600" /> : <ToggleLeft className="w-8 h-8 text-gray-400" />}
                  </button>
                  <FormLabel className="cursor-pointer" onClick={() => field.onChange(!field.value)}>{field.value ? "Active" : "Inactive"}</FormLabel>
                </div>
              </FormItem>
            )} />
          </div>

          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2"><Image className="w-4 h-4" /> Images</h3>
            <div className="flex gap-2">
              <Input placeholder="Image URL" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} className="flex-1" data-testid="input-image-url" />
              <Button type="button" size="sm" onClick={() => { if (newImageUrl.trim()) { setImages([...images, newImageUrl.trim()]); setNewImageUrl(""); } }} className="cursor-pointer touch-manipulation" data-testid="button-add-image">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden border border-border/50 bg-muted/20 aspect-square">
                    {img.startsWith("__generated__:") ? (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground p-2 text-center">Auto-generated image</div>
                    ) : (
                      <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ""; }} />
                    )}
                    <div className="absolute top-1 right-1 flex gap-1">
                      {i > 0 && (
                        <button type="button" onClick={() => { const n = [...images]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; setImages(n); }} className="p-1 bg-white/80 dark:bg-gray-800/80 rounded text-xs cursor-pointer"><ChevronUp className="w-3 h-3" /></button>
                      )}
                      <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="p-1 bg-white/80 dark:bg-gray-800/80 rounded text-xs cursor-pointer text-red-600"><X className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">Specifications</h3>
            {specKeys.map((spec, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input placeholder="Key" value={spec.key} onChange={(e) => { const n = [...specKeys]; n[i].key = e.target.value; setSpecKeys(n); }} className="w-40" />
                <Input placeholder="Value" value={spec.value} onChange={(e) => { const n = [...specKeys]; n[i].value = e.target.value; setSpecKeys(n); }} className="flex-1" />
                <button type="button" onClick={() => setSpecKeys(specKeys.filter((_, j) => j !== i))} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded cursor-pointer"><X className="w-4 h-4" /></button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => setSpecKeys([...specKeys, { key: "", value: "" }])} className="cursor-pointer touch-manipulation" data-testid="button-add-spec">
              <Plus className="w-3 h-3 mr-1" /> Add Spec
            </Button>
          </div>

          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">Features</h3>
            <div className="flex gap-2">
              <Input placeholder="Add feature" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} className="flex-1" data-testid="input-feature" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (newFeature.trim()) { setFeatures([...features, newFeature.trim()]); setNewFeature(""); } } }} />
              <Button type="button" size="sm" onClick={() => { if (newFeature.trim()) { setFeatures([...features, newFeature.trim()]); setNewFeature(""); } }} className="cursor-pointer touch-manipulation" data-testid="button-add-feature"><Plus className="w-4 h-4" /></Button>
            </div>
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {features.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted/50 rounded-lg text-sm">
                    {f}
                    <button type="button" onClick={() => setFeatures(features.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">Applications</h3>
            <div className="flex gap-2">
              <Input placeholder="Add application" value={newApplication} onChange={(e) => setNewApplication(e.target.value)} className="flex-1" data-testid="input-application" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (newApplication.trim()) { setApplications([...applications, newApplication.trim()]); setNewApplication(""); } } }} />
              <Button type="button" size="sm" onClick={() => { if (newApplication.trim()) { setApplications([...applications, newApplication.trim()]); setNewApplication(""); } }} className="cursor-pointer touch-manipulation" data-testid="button-add-application"><Plus className="w-4 h-4" /></Button>
            </div>
            {applications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {applications.map((a, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted/50 rounded-lg text-sm">
                    {a}
                    <button type="button" onClick={() => setApplications(applications.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel} className="cursor-pointer touch-manipulation" data-testid="button-cancel-product">Cancel</Button>
            <Button type="submit" className="cursor-pointer touch-manipulation" data-testid="button-save-product">
              <Save className="w-4 h-4 mr-2" /> {isEdit ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function ProductsView() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null | "new">(null);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
    queryFn: () => adminFetch("/api/admin/products"),
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/admin/categories"],
    queryFn: () => adminFetch("/api/admin/categories"),
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (data._id) {
        const id = data._id;
        delete data._id;
        return adminFetch(`/api/admin/products/${id}`, { method: "PATCH", body: JSON.stringify(data) });
      }
      return adminFetch("/api/admin/products", { method: "POST", body: JSON.stringify(data) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setEditProduct(null);
      toast({ title: "Product saved" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => adminFetch(`/api/admin/products/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product deleted" });
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) =>
      adminFetch(`/api/admin/products/${id}`, { method: "PATCH", body: JSON.stringify({ isActive }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || p.categorySlug.toLowerCase().includes(q));
  }, [products, search]);

  if (editProduct) {
    return (
      <ProductForm
        product={editProduct === "new" ? null : editProduct}
        categories={categories}
        onCancel={() => setEditProduct(null)}
        onSave={(data) => {
          if (editProduct !== "new") {
            saveMutation.mutate({ ...data, _id: (editProduct as Product).id });
          } else {
            saveMutation.mutate(data);
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-5" data-testid="section-products">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground" data-testid="heading-products">Products</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your product catalogue</p>
        </div>
        <Button onClick={() => setEditProduct("new")} className="cursor-pointer touch-manipulation" data-testid="button-add-product">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl h-10" data-testid="input-search-products" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-border/50">
          <Package className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="hidden lg:grid grid-cols-[60px_2fr_1fr_1fr_80px_80px_100px] gap-4 px-5 py-3 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/30">
            <span></span><span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span>Status</span><span></span>
          </div>
          <div className="divide-y divide-border/30">
            {filtered.map((product) => {
              const images: string[] = (() => { try { return JSON.parse(product.images || "[]"); } catch { return []; } })();
              const firstImage = images[0] && !images[0].startsWith("__generated__:") ? images[0] : null;
              const cat = categories.find(c => c.slug === product.categorySlug);
              return (
                <div key={product.id} className="px-5 py-4 hover:bg-muted/20 transition-colors group" data-testid={`product-row-${product.id}`}>
                  <div className="lg:grid lg:grid-cols-[60px_2fr_1fr_1fr_80px_80px_100px] lg:gap-4 lg:items-center">
                    <div className="hidden lg:block">
                      {firstImage ? (
                        <img src={firstImage} alt="" className="w-12 h-12 rounded-lg object-cover border border-border/30" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted/40 flex items-center justify-center"><Box className="w-5 h-5 text-muted-foreground/40" /></div>
                      )}
                    </div>
                    <div className="mb-1 lg:mb-0">
                      <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{product.slug}</p>
                    </div>
                    <div className="mb-1 lg:mb-0">
                      <span className="text-xs px-2 py-0.5 bg-muted/50 rounded-full">{cat?.title || product.categorySlug}</span>
                    </div>
                    <div className="mb-1 lg:mb-0">
                      <p className="text-sm font-medium">{formatPrice(product.basePrice)}</p>
                      {product.comparePrice && <p className="text-xs text-muted-foreground line-through">{formatPrice(product.comparePrice)}</p>}
                    </div>
                    <div className="mb-1 lg:mb-0">
                      {product.stock === null ? (
                        <span className="text-xs text-muted-foreground">∞</span>
                      ) : product.stock <= 0 ? (
                        <span className="text-xs text-red-600 font-medium">Out</span>
                      ) : product.stock <= 5 ? (
                        <span className="text-xs text-amber-600 font-medium">{product.stock}</span>
                      ) : (
                        <span className="text-xs text-green-600">{product.stock}</span>
                      )}
                    </div>
                    <div className="mb-2 lg:mb-0">
                      <button onClick={() => toggleActive.mutate({ id: product.id, isActive: !product.isActive })} className="cursor-pointer touch-manipulation" data-testid={`toggle-active-${product.id}`}>
                        {product.isActive ? <ToggleRight className="w-6 h-6 text-green-600" /> : <ToggleLeft className="w-6 h-6 text-gray-400" />}
                      </button>
                    </div>
                    <div className="flex items-center gap-1 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditProduct(product)} className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground cursor-pointer" data-testid={`button-edit-product-${product.id}`}><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm("Delete this product?")) deleteMutation.mutate(product.id); }} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-muted-foreground hover:text-red-600 cursor-pointer" data-testid={`button-delete-product-${product.id}`}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-5 py-3 bg-muted/20 border-t border-border/30">
            <p className="text-xs text-muted-foreground">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function PageForm({ page, onSave, onCancel }: { page?: Page | null; onSave: (data: any) => void; onCancel: () => void }) {
  const isEdit = !!page;
  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    content: z.string().default(""),
    isPublished: z.boolean().default(false),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: page?.title || "",
      slug: page?.slug || "",
      content: page?.content || "",
      isPublished: page?.isPublished ?? false,
    },
  });

  const autoSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="space-y-6" data-testid="section-page-form">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onCancel} className="rounded-lg cursor-pointer touch-manipulation" data-testid="button-back-pages"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
        <h2 className="text-xl font-bold text-foreground">{isEdit ? "Edit Page" : "Create Page"}</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl><Input {...field} onChange={(e) => { field.onChange(e); if (!isEdit) form.setValue("slug", autoSlug(e.target.value)); }} data-testid="input-page-title" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl><Input {...field} data-testid="input-page-slug" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="content" render={({ field }) => (
              <FormItem>
                <FormLabel>Content (Markdown / HTML)</FormLabel>
                <FormControl><Textarea rows={15} {...field} className="font-mono text-sm" data-testid="input-page-content" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="isPublished" render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => field.onChange(!field.value)} className="cursor-pointer touch-manipulation" data-testid="toggle-page-published">
                    {field.value ? <ToggleRight className="w-8 h-8 text-green-600" /> : <ToggleLeft className="w-8 h-8 text-gray-400" />}
                  </button>
                  <FormLabel className="cursor-pointer" onClick={() => field.onChange(!field.value)}>{field.value ? "Published" : "Draft"}</FormLabel>
                </div>
              </FormItem>
            )} />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel} className="cursor-pointer touch-manipulation" data-testid="button-cancel-page">Cancel</Button>
            <Button type="submit" className="cursor-pointer touch-manipulation" data-testid="button-save-page"><Save className="w-4 h-4 mr-2" /> {isEdit ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function PagesView() {
  const { toast } = useToast();
  const [editPage, setEditPage] = useState<Page | null | "new">(null);

  const { data: pages = [], isLoading } = useQuery<Page[]>({
    queryKey: ["/api/admin/pages"],
    queryFn: () => adminFetch("/api/admin/pages"),
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (data._id) {
        const id = data._id;
        delete data._id;
        return adminFetch(`/api/admin/pages/${id}`, { method: "PATCH", body: JSON.stringify(data) });
      }
      return adminFetch("/api/admin/pages", { method: "POST", body: JSON.stringify(data) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      setEditPage(null);
      toast({ title: "Page saved" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => adminFetch(`/api/admin/pages/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      toast({ title: "Page deleted" });
    },
  });

  if (editPage) {
    return (
      <PageForm
        page={editPage === "new" ? null : editPage}
        onCancel={() => setEditPage(null)}
        onSave={(data) => {
          if (editPage !== "new") {
            saveMutation.mutate({ ...data, _id: (editPage as Page).id });
          } else {
            saveMutation.mutate(data);
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-5" data-testid="section-pages">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground" data-testid="heading-pages">Pages</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage custom pages</p>
        </div>
        <Button onClick={() => setEditPage("new")} className="cursor-pointer touch-manipulation" data-testid="button-add-page">
          <Plus className="w-4 h-4 mr-2" /> Create Page
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : pages.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-border/50">
          <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No pages yet</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="divide-y divide-border/30">
            {pages.map((page) => (
              <div key={page.id} className="px-5 py-4 hover:bg-muted/20 transition-colors group" data-testid={`page-row-${page.id}`}>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{page.title}</p>
                      {page.isPublished ? (
                        <span className="text-xs px-2 py-0.5 bg-green-50 dark:bg-green-950/30 text-green-600 rounded-full border border-green-200 dark:border-green-800">Published</span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full border border-gray-200 dark:border-gray-700">Draft</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">/page/{page.slug} &middot; Updated {formatDate(page.updatedAt)}</p>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <button onClick={() => setEditPage(page)} className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground cursor-pointer" data-testid={`button-edit-page-${page.id}`}><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => { if (confirm("Delete this page?")) deleteMutation.mutate(page.id); }} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-muted-foreground hover:text-red-600 cursor-pointer" data-testid={`button-delete-page-${page.id}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type AdminTab = "dashboard" | "leads" | "products" | "pages";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(!!getToken());
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearToken();
    setAuthenticated(false);
    queryClient.clear();
  };

  const verifyAuth = useQuery({
    queryKey: ["/api/admin/stats", "verify"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats", { headers: authHeaders() });
      if (!res.ok) {
        clearToken();
        setAuthenticated(false);
        throw new Error("Session expired");
      }
      return res.json();
    },
    enabled: authenticated,
    retry: false,
  });

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />;
  }

  const navItems = [
    { id: "dashboard" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
    { id: "leads" as AdminTab, label: "Leads", icon: Users },
    { id: "products" as AdminTab, label: "Products", icon: Package },
    { id: "pages" as AdminTab, label: "Pages", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-muted/20 dark:bg-gray-950" data-testid="admin-panel">
      <header className="sticky top-0 z-30 bg-card border-b border-border/50 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 h-14">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-muted/50 cursor-pointer touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="button-admin-mobile-menu"
            >
              <LayoutDashboard className="w-5 h-5 text-muted-foreground" />
            </button>
            <img src={logoPath} alt="Abley's Rehab" className="h-7" />
            <span className="text-sm font-semibold text-muted-foreground hidden sm:inline">Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground cursor-pointer touch-manipulation" data-testid="button-admin-logout">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-56 flex-shrink-0 border-r border-border/30 bg-card min-h-[calc(100vh-3.5rem)] sticky top-14" data-testid="admin-sidebar">
          <nav className="p-3 space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer touch-manipulation ${
                  activeTab === item.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
                data-testid={`nav-${item.id}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="fixed top-14 left-0 bottom-0 w-56 bg-card z-40 lg:hidden border-r border-border/30 shadow-xl"
                data-testid="admin-sidebar-mobile"
              >
                <nav className="p-3 space-y-0.5">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer touch-manipulation ${
                        activeTab === item.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                      data-testid={`nav-mobile-${item.id}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8" data-testid="admin-main-content">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "leads" && <LeadsView />}
          {activeTab === "products" && <ProductsView />}
          {activeTab === "pages" && <PagesView />}
        </main>
      </div>
    </div>
  );
}
