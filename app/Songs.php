<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
class Songs extends Model
{
    protected $fillable = ['title', 'artist', 'lyrics'];
    protected $guarded = ['id'];

    public function saveSong ($id, $data)
    {
        $this->setTable('song_lists');
        return Songs::updateOrCreate(['id'=> $id], $data);
    }
    
    public function loadSong ()
    {
        return DB::table('song_lists')->get();
    }
    
    public function deleteSong ($id)
    {
        return DB::table('song_lists')->where('id', '=', $id)->delete();
    }
}
