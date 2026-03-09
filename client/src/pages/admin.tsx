import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import type { Lead } from "@shared/schema";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const { data: stats, isLoading } = useQuery<{
    total: number;
    new: number;
    contacted: number;
    converted: number;
    closed: number;
  }>({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats", { headers: authHeaders() });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    refetchInterval: 30000,
  });

  const { data: recentLeads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/admin/leads"],
    queryFn: async () => {
      const res = await fetch("/api/admin/leads", { headers: authHeaders() });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const statCards = [
    { label: "Total Leads", value: stats?.total ?? 0, icon: Users, color: "text-primary", bg: "bg-primary/10" },
    { label: "New", value: stats?.new ?? 0, icon: Clock, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
    { label: "Contacted", value: stats?.contacted ?? 0, icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30" },
    { label: "Converted", value: stats?.converted ?? 0, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30" },
  ];

  return (
    <div className="space-y-6" data-testid="section-dashboard">
      <div>
        <h2 className="text-2xl font-bold text-foreground" data-testid="heading-dashboard">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">Overview of your enquiries and leads</p>
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
    queryFn: async () => {
      const res = await fetch("/api/admin/leads", { headers: authHeaders() });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: (updatedLead) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      if (selectedLead?.id === updatedLead.id) setSelectedLead(updatedLead);
      toast({ title: "Status updated" });
    },
  });

  const deleteLead = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete");
      return res.json();
    },
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
    if (statusFilter !== "all") {
      result = result.filter((l) => l.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.phone && l.phone.toLowerCase().includes(q)) ||
          (l.organisation && l.organisation.toLowerCase().includes(q)) ||
          (l.city && l.city.toLowerCase().includes(q))
      );
    }
    return result;
  }, [leads, statusFilter, search]);

  if (selectedLead) {
    return (
      <LeadDetailView
        lead={selectedLead}
        onBack={() => setSelectedLead(null)}
        onStatusChange={(id, status) => updateStatus.mutate({ id, status })}
      />
    );
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
          <Input
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl h-10"
            data-testid="input-search-leads"
          />
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
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-border/50">
          <AlertCircle className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No leads found</p>
          {(search || statusFilter !== "all") && (
            <Button variant="link" onClick={() => { setSearch(""); setStatusFilter("all"); }} className="mt-2 cursor-pointer" data-testid="button-clear-lead-filters">
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="hidden lg:grid grid-cols-[2fr_2fr_1fr_1.2fr_1fr_80px] gap-4 px-5 py-3 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/30">
            <span>Name</span>
            <span>Email / Phone</span>
            <span>Type</span>
            <span>Date</span>
            <span>Status</span>
            <span></span>
          </div>
          <div className="divide-y divide-border/30">
            {filtered.map((lead) => (
              <div
                key={lead.id}
                className="px-5 py-4 hover:bg-muted/20 transition-colors cursor-pointer group"
                onClick={() => setSelectedLead(lead)}
                data-testid={`lead-row-${lead.id}`}
              >
                <div className="lg:grid lg:grid-cols-[2fr_2fr_1fr_1.2fr_1fr_80px] lg:gap-4 lg:items-center">
                  <div className="mb-1 lg:mb-0">
                    <p className="text-sm font-medium text-foreground truncate" data-testid={`text-lead-name-${lead.id}`}>{lead.name}</p>
                    {lead.organisation && (
                      <p className="text-xs text-muted-foreground truncate">{lead.organisation}</p>
                    )}
                  </div>
                  <div className="mb-1 lg:mb-0">
                    <p className="text-sm text-muted-foreground truncate">{lead.email}</p>
                    {lead.phone && <p className="text-xs text-muted-foreground truncate">{lead.phone}</p>}
                  </div>
                  <div className="mb-1 lg:mb-0">
                    <p className="text-xs text-muted-foreground truncate">{lead.requirementType || lead.interest || "—"}</p>
                  </div>
                  <div className="mb-2 lg:mb-0">
                    <p className="text-xs text-muted-foreground">{formatDate(lead.createdAt)}</p>
                  </div>
                  <div className="flex items-center justify-between lg:justify-start">
                    <StatusBadge status={lead.status} />
                  </div>
                  <div className="hidden lg:flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                      className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground cursor-pointer"
                      aria-label="View lead"
                      data-testid={`button-view-lead-${lead.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); if (confirm("Delete this lead?")) deleteLead.mutate(lead.id); }}
                      className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-muted-foreground hover:text-red-600 cursor-pointer"
                      aria-label="Delete lead"
                      data-testid={`button-delete-lead-${lead.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

type AdminTab = "dashboard" | "leads";

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
        </main>
      </div>
    </div>
  );
}
