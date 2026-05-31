import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Loader from '../components/Loader'
import AdminLayout from '../components/AdminLayout'
import ContentSection from '../components/ContentSection'

// ── Types ──────────────────────────────────────────────────────────────────

interface ContentItem {
  id: string
  content_key: string
  title: string
  type: string
  platform: string
  duration_sec: number
  published: boolean
  published_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

type SortField = 'created_at' | 'updated_at' | 'type' | 'title' | 'duration_sec'
type SortDir = 'asc' | 'desc'

const CONTENT_TYPES = [
  'Awareness',
  'Education',
  'Engagement',
  'Lead Magnet',
  'Nurturing',
  'Problem Agitation',
  'Soft Selling',
  'Social Proof',
  'Urgency & Scarcity',
  'Hard Selling',
]

const PLATFORMS = ['Instagram', 'TikTok', 'Facebook', 'YouTube', 'Twitter/X']

const TYPE_COLOR: Record<string, string> = {
  'Awareness':         '#fb923c',
  'Education':         '#60a5fa',
  'Engagement':        '#a78bfa',
  'Lead Magnet':       '#34d399',
  'Nurturing':         '#fbbf24',
  'Problem Agitation': '#f87171',
  'Soft Selling':      '#22d3ee',
  'Social Proof':      '#10b981',
  'Urgency & Scarcity':'#f97316',
  'Hard Selling':      'var(--spark)',
}

// ── Sub-components ─────────────────────────────────────────────────────────

function FilterChip({
  active, label, onClick,
}: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'var(--spark)' : '#161616',
        border: `1px solid ${active ? 'var(--spark)' : '#2a2a2a'}`,
        borderRadius: 8,
        color: active ? '#fff' : '#888',
        fontSize: 12,
        fontWeight: active ? 700 : 400,
        padding: '5px 12px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

function SortButton({
  field, label, current, dir, onSort,
}: {
  field: SortField; label: string; current: SortField; dir: SortDir
  onSort: (f: SortField) => void
}) {
  const active = current === field
  return (
    <button
      onClick={() => onSort(field)}
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        background: active ? '#1a1a1a' : 'none',
        border: `1px solid ${active ? '#333' : 'transparent'}`,
        borderRadius: 6, color: active ? '#e5e5e5' : '#666',
        fontSize: 12, fontWeight: active ? 700 : 400,
        padding: '4px 10px', cursor: 'pointer',
      }}
    >
      {label}
      {active && <span style={{ fontSize: 10 }}>{dir === 'asc' ? '↑' : '↓'}</span>}
    </button>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function AdminContentPage() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  // filters
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [platformFilter, setPlatformFilter] = useState<string | null>(null)
  const [publishedFilter, setPublishedFilter] = useState<'all' | 'published' | 'draft'>('all')

  // sort
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  // inline editing
  const [editNotes, setEditNotes] = useState<Record<string, string>>({})
  const [editPlatform, setEditPlatform] = useState<Record<string, string>>({})

  // preview modal — delegates to ContentSection
  const [showPreview, setShowPreview] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/auth'); return }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (!profile || profile.role !== 'admin') { navigate('/dashboard'); return }
      await fetchItems()
      setLoading(false)
    }
    load()
  }, [navigate])

  async function fetchItems() {
    const { data, error } = await supabase
      .from('content_items')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) { console.error(error.message); return }
    if (data) {
      setItems(data as ContentItem[])
      const notes: Record<string, string> = {}
      const platforms: Record<string, string> = {}
      for (const item of data as ContentItem[]) {
        notes[item.id] = item.notes ?? ''
        platforms[item.id] = item.platform
      }
      setEditNotes(notes)
      setEditPlatform(platforms)
    }
  }

  async function togglePublished(item: ContentItem) {
    setSaving(item.id)
    const next = !item.published
    await supabase
      .from('content_items')
      .update({ published: next, published_at: next ? new Date().toISOString() : null })
      .eq('id', item.id)
    await fetchItems()
    setSaving(null)
  }

  async function saveNotes(item: ContentItem) {
    setSaving(item.id)
    await supabase
      .from('content_items')
      .update({ notes: editNotes[item.id] || null, platform: editPlatform[item.id] })
      .eq('id', item.id)
    await fetchItems()
    setSaving(null)
  }

  function handleSort(field: SortField) {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  const filtered = useMemo(() => {
    let list = [...items]
    if (typeFilter) list = list.filter(i => i.type === typeFilter)
    if (platformFilter) list = list.filter(i => i.platform === platformFilter)
    if (publishedFilter === 'published') list = list.filter(i => i.published)
    if (publishedFilter === 'draft') list = list.filter(i => !i.published)
    list.sort((a, b) => {
      let av: string | number = a[sortField] ?? ''
      let bv: string | number = b[sortField] ?? ''
      if (typeof av === 'string' && typeof bv === 'string') {
        av = av.toLowerCase(); bv = bv.toLowerCase()
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return list
  }, [items, typeFilter, platformFilter, publishedFilter, sortField, sortDir])

  const counts = {
    all: items.length,
    published: items.filter(i => i.published).length,
    draft: items.filter(i => !i.published).length,
  }

  if (loading) return <Loader />

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: 'var(--signal)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Admin Panel</p>
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>Content</h1>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, background: 'rgba(123,108,255,0.1)', color: 'var(--signal)', padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(123,108,255,0.25)' }}>
              {counts.all} items
            </span>
            <span style={{ fontSize: 13, background: 'rgba(74,222,128,0.08)', color: '#4ade80', padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(74,222,128,0.25)' }}>
              {counts.published} published
            </span>
            <span style={{ fontSize: 13, background: 'rgba(255,255,255,0.04)', color: '#888', padding: '4px 12px', borderRadius: 999, border: '1px solid #2a2a2a' }}>
              {counts.draft} draft
            </span>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: 14, padding: '16px 20px', marginBottom: 24 }}>

          {/* Published filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: '#555', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 4 }}>Status</span>
            {(['all', 'published', 'draft'] as const).map(v => (
              <FilterChip
                key={v}
                active={publishedFilter === v}
                label={v === 'all' ? `All (${counts.all})` : v === 'published' ? `Published (${counts.published})` : `Draft (${counts.draft})`}
                onClick={() => setPublishedFilter(v)}
              />
            ))}
          </div>

          {/* Type filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: '#555', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 4 }}>Type</span>
            <FilterChip active={typeFilter === null} label="All types" onClick={() => setTypeFilter(null)} />
            {CONTENT_TYPES.map(t => (
              <FilterChip key={t} active={typeFilter === t} label={t} onClick={() => setTypeFilter(typeFilter === t ? null : t)} />
            ))}
          </div>

          {/* Platform filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: '#555', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 4 }}>Platform</span>
            <FilterChip active={platformFilter === null} label="All platforms" onClick={() => setPlatformFilter(null)} />
            {PLATFORMS.map(p => (
              <FilterChip key={p} active={platformFilter === p} label={p} onClick={() => setPlatformFilter(platformFilter === p ? null : p)} />
            ))}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid #1a1a1a', paddingTop: 12 }}>
            <span style={{ color: '#555', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 6 }}>Sort</span>
            <SortButton field="created_at"   label="Date created" current={sortField} dir={sortDir} onSort={handleSort} />
            <SortButton field="updated_at"   label="Last updated" current={sortField} dir={sortDir} onSort={handleSort} />
            <SortButton field="type"         label="Type"         current={sortField} dir={sortDir} onSort={handleSort} />
            <SortButton field="title"        label="Title"        current={sortField} dir={sortDir} onSort={handleSort} />
            <SortButton field="duration_sec" label="Duration"     current={sortField} dir={sortDir} onSort={handleSort} />
          </div>
        </div>

        {/* ── Preview toggle ── */}
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => setShowPreview(p => !p)}
            style={{
              background: showPreview ? 'rgba(123,108,255,0.15)' : '#161616',
              border: `1px solid ${showPreview ? 'rgba(123,108,255,0.4)' : '#2a2a2a'}`,
              borderRadius: 8, color: showPreview ? 'var(--signal)' : '#666',
              fontSize: 13, fontWeight: 600, padding: '7px 16px', cursor: 'pointer',
            }}
          >
            {showPreview ? '▲ Hide Ad Previews' : '▼ Show Ad Previews'}
          </button>
        </div>

        {showPreview && (
          <div style={{ marginBottom: 32 }}>
            <ContentSection />
          </div>
        )}

        {/* ── Content table ── */}
        {filtered.length === 0 ? (
          <p style={{ color: '#555', fontSize: 14 }}>No items match the current filters.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(item => {
              const color = TYPE_COLOR[item.type] ?? '#888'
              const isDirty =
                editNotes[item.id] !== (item.notes ?? '') ||
                editPlatform[item.id] !== item.platform

              return (
                <div
                  key={item.id}
                  style={{
                    background: '#111',
                    border: `1px solid ${item.published ? 'rgba(74,222,128,0.15)' : '#1f1f1f'}`,
                    borderRadius: 14,
                    padding: '20px 24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>

                    {/* Left: metadata */}
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: 11, color, background: `${color}18`,
                          border: `1px solid ${color}44`, borderRadius: 999,
                          padding: '2px 10px', fontWeight: 700,
                        }}>{item.type}</span>

                        {item.published ? (
                          <span style={{ fontSize: 11, color: '#4ade80', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 999, padding: '2px 10px', fontWeight: 700 }}>
                            Published
                          </span>
                        ) : (
                          <span style={{ fontSize: 11, color: '#666', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 999, padding: '2px 10px' }}>
                            Draft
                          </span>
                        )}
                      </div>

                      <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
                        {item.title}
                      </h3>

                      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <span style={{ color: '#555', fontSize: 12 }}>⏱ {item.duration_sec}s</span>
                        <span style={{ color: '#555', fontSize: 12 }}>
                          Created {new Date(item.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        {item.published_at && (
                          <span style={{ color: '#4ade80', fontSize: 12 }}>
                            Published {new Date(item.published_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                        {item.updated_at !== item.created_at && (
                          <span style={{ color: '#444', fontSize: 12 }}>
                            Updated {new Date(item.updated_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end', flexShrink: 0 }}>

                      {/* Platform selector */}
                      <select
                        value={editPlatform[item.id] ?? item.platform}
                        onChange={e => setEditPlatform(p => ({ ...p, [item.id]: e.target.value }))}
                        style={{
                          background: '#161616', border: '1px solid #2a2a2a', borderRadius: 8,
                          color: '#aaa', fontSize: 12, padding: '5px 10px', cursor: 'pointer', outline: 'none',
                        }}
                      >
                        {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>

                      {/* Publish toggle */}
                      <button
                        onClick={() => togglePublished(item)}
                        disabled={saving === item.id}
                        style={{
                          background: item.published ? 'rgba(239,68,68,0.12)' : '#16a34a',
                          border: item.published ? '1px solid rgba(239,68,68,0.3)' : 'none',
                          borderRadius: 8,
                          color: item.published ? '#f87171' : '#fff',
                          fontSize: 12, fontWeight: 700, padding: '6px 14px', cursor: 'pointer',
                          opacity: saving === item.id ? 0.5 : 1,
                          minWidth: 110,
                        }}
                      >
                        {saving === item.id ? '...' : item.published ? 'Unpublish' : '✓ Publish'}
                      </button>
                    </div>
                  </div>

                  {/* Notes row */}
                  <div style={{ marginTop: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      placeholder="Add notes (e.g. platform, performance, next steps)…"
                      value={editNotes[item.id] ?? ''}
                      onChange={e => setEditNotes(p => ({ ...p, [item.id]: e.target.value }))}
                      style={{
                        flex: 1, background: '#0d0d0d', border: '1px solid #222',
                        borderRadius: 8, padding: '7px 12px', color: '#ccc',
                        fontSize: 13, outline: 'none',
                      }}
                    />
                    {isDirty && (
                      <button
                        onClick={() => saveNotes(item)}
                        disabled={saving === item.id}
                        style={{
                          background: 'var(--spark)', border: 'none', borderRadius: 8,
                          color: '#fff', fontSize: 12, fontWeight: 700, padding: '7px 14px',
                          cursor: 'pointer', opacity: saving === item.id ? 0.5 : 1, whiteSpace: 'nowrap',
                        }}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
